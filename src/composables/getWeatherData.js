import { ref } from 'vue'
import tzLookup from 'tz-lookup'
import { config } from '../../config'
import { getWeatherIcon } from './weatherIcons'

const username = config.meteomatics.username // Username for the Meteomatics Account
const password = config.meteomatics.password // Password for the Meteomatics Account
const credentials = btoa(`${username}:${password}`)
/**
 * Fetches the weather data for the given postal code and date
 * @param {string} searchQuery a search String that is used to find the Location
 * @returns {object} an object containing the formatted weather data, an error message if something went wrong and a function to load the data
 */
const getWeatherData = (searchQuery, languageSet) => {
    const daysToForecast = 7
    const weatherData = ref([]);
    const formattedWeatherData = ref({});
    const error = ref(null);
    const locationInfo = ref({});
    const gDate = ref(null);

    /**
     * Loads the weather data for the given date and postal code
     * @param {string} date the date in the format YYYY-MM-DD
     * @param {boolean} saveInLocalStorage if the location should be saved in the local storage
     * @throws {Error} if the location could not be found or the weather data could not be loaded
     */
    const load = async (date, saveInLocalStorage = true) => {
        gDate.value = getNextDays(date, daysToForecast);
        let lat = ''
        let lon = ''
        try {
            if (localStorage.getItem('cookieConsent') !== 'true') throw Error('Cookie consent not given');
            lat = localStorage.getItem('lat') || ''
            lon = localStorage.getItem('lon') || ''
            locationInfo.value = await getLocation(searchQuery, lat, lon, saveInLocalStorage)
            lat = locationInfo.value.lat;
            lon = locationInfo.value.lon;
            const gDateValues = gDate.value.slice(0, daysToForecast)
            const apiUrlDays = gDateValues.map(date => `${date}T00:00:00Z`).join(',')
            const apiUrl = `${config.meteomatics.apiurl}${apiUrlDays}/${config.meteomatics.parameter}${lat},${lon}/json`
            if (!apiUrl) return
            let response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw Error(languageSet.errors.noWeatherData);
            }
            weatherData.value = await response.json()
        } catch (err) {
            error.value = err.message
        } finally {
            if (weatherData.value?.data) {
                formattedWeatherData.value = buildWeatherDataArray()
            }
        }
    }

    const getLocation = async (search, plat, plon, saveInLocalStorage) => {
        let geocodeApiUrl = ''
        let lat = plat || ''
        let lon = plon || ''
        if (!search && !lat && !lon) {
            const currPosition = await getCurrentLocationFromBrowser();
            lat = currPosition.lat;
            lon = currPosition.lon;
        }
        if (!search) {
            geocodeApiUrl = `${config.nominatim.apiurlreverse}lat=${lat}&lon=${lon}&zoom=10&${config.nominatim.responseParameter}`;
        } else {
            geocodeApiUrl = `${config.nominatim.apiurlsearch}q=${search}&${config.nominatim.responseParameter}`;
        }
        try {
            let response = await fetch(geocodeApiUrl)
            if (!response.ok) {
                throw Error('Location not found');
            }
            let data = await response.json();
            if (data.length === 0) {
                throw Error('Location not found');
            }
            if (Array.isArray(data)) data = data[0];
            if (saveInLocalStorage) {
                localStorage.setItem('lat', data.lat);
                localStorage.setItem('lon', data.lon);
            }
            return data
        }
        catch (err) {
            throw Error('Location not found');
        }
    }

    const getCurrentLocationFromBrowser = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation not supported'));
                }
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            return {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }
        } catch (error) {
            throw Error('Location not found');
        }
    };

    const getNextDays = (dateString, numberOfDays) => {
        const result = [];
        let currentDate = new Date(dateString);

        for (let i = 0; i < numberOfDays; i++) {
            result.push(currentDate.toISOString().split('T')[0]);
            currentDate = new Date(currentDate.getTime() + 86400000);
        }
        return result;
    };

    const getDayName = (date) => {
        const days = languageSet.days;
        if (!date) return '';
        const dateObj = new Date(date);
        return days[dateObj.getDay()];
    };

    const buildWeatherDataArray = () => {
        const weatherArray = [];
        gDate.value.forEach(date => {
            weatherArray.push(formatWeatherData(date));
        });
        return weatherArray;
    }

    const formatWeatherData = (date) => {
        if (!weatherData.value) return null;
        return {
            date: date,
            day: getDayName(date),
            location: locationInfo.value.display_name,
            temperatureMin: getParameterValue("t_min_2m_24h:C", date),
            temperatureMax: getParameterValue("t_max_2m_24h:C", date),
            precipitation: getParameterValue("precip_24h:mm", date),
            uvIndex: getParameterValue("uv:idx", date),
            weatherIcon: getWeatherIcon(getParameterValue("weather_symbol_24h:idx", date), languageSet),
            windSpeed: getParameterValue("wind_speed_10m:ms", date),
            windDirection: getParameterValue("wind_dir_10m:d", date),
            windGusts: getParameterValue("wind_gusts_10m_24h:ms", date),
            sunrise: formatTime(getParameterValue("sunrise:sql", date), locationInfo.value.lat, locationInfo.value.lon),
            sunset: formatTime(getParameterValue("sunset:sql", date), locationInfo.value.lat, locationInfo.value.lon),
        };
    };

    const formatTime = (dateString, lat, lon) => {
        if (!dateString) return "N/A";
        const timeZone = tzLookup(lat, lon);
        return new Date(dateString).toLocaleTimeString(languageSet.locale, { hour: '2-digit', minute: '2-digit', timeZone: timeZone });
    }

    const getParameterValue = (parameterName, date) => {
        const param = weatherData.value?.data.find(p => p.parameter === parameterName);
        if (!param) return "N/A";
        let formattedDate = date + "T00:00:00Z"
        const dateEntry = param.coordinates[0]?.dates.find(d => d.date === formattedDate);
        return dateEntry ? dateEntry.value : "N/A";
    }

    return ({ formattedWeatherData, error, load });
}

export default getWeatherData