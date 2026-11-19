/**
 * Client-side demo data in the same shape the Meteomatics API returns, so the
 * rest of the app can consume it without knowing where it came from.
 * Values are deterministic per date and location, so reloads look stable.
 */

const DAY_MS = 86400000

// Weather symbol indices used by weatherIcons.js
const DRY_SYMBOLS = [1, 1, 2, 2, 3, 4, 11]
const WET_SYMBOLS = [5, 8, 15, 14]

// Small seeded PRNG (mulberry32) so the same date and place give the same values
const seededRandom = (seed) => {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6D2B79F5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const hashString = (str) => {
    let h = 2166136261
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i)
        h = Math.imul(h, 16777619)
    }
    return h >>> 0
}

const round = (value, digits = 1) => Number(value.toFixed(digits))

const dayOfYear = (date) => {
    const d = new Date(`${date}T00:00:00Z`)
    return Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / DAY_MS)
}

/**
 * Approximates sunrise and sunset (UTC) with the standard sunrise equation.
 */
const getSunTimes = (date, lat, lon) => {
    const rad = Math.PI / 180
    const declination = 23.44 * Math.sin(2 * Math.PI * (284 + dayOfYear(date)) / 365)
    // -0.833 degrees accounts for atmospheric refraction and the sun's disc radius
    const cosH = Math.min(1, Math.max(-1,
        (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(declination * rad)) /
        (Math.cos(lat * rad) * Math.cos(declination * rad))))
    const halfDayHours = Math.acos(cosH) / rad / 15
    const solarNoonUtc = 12 - lon / 15
    const midnight = Date.parse(`${date}T00:00:00Z`)
    return {
        sunrise: new Date(midnight + (solarNoonUtc - halfDayHours) * 3600000).toISOString(),
        sunset: new Date(midnight + (solarNoonUtc + halfDayHours) * 3600000).toISOString(),
    }
}

const getDayValues = (date, lat, lon) => {
    const rand = seededRandom(hashString(`${date}|${lat.toFixed(1)}|${lon.toFixed(1)}`))

    // Seasonal baseline: warmest around day 200 in the northern hemisphere
    const season = Math.cos(2 * Math.PI * (dayOfYear(date) - 200) / 365)
    const hemisphere = lat >= 0 ? 1 : -1
    const latitudeCooling = Math.min(Math.abs(lat), 70) / 70
    const base = 22 - 20 * latitudeCooling + 12 * season * hemisphere * (0.4 + latitudeCooling)

    const tMax = base + 3 + rand() * 4
    const tMin = tMax - (5 + rand() * 5)

    const wet = rand() < 0.35
    const symbols = wet ? WET_SYMBOLS : DRY_SYMBOLS
    const symbol = symbols[Math.floor(rand() * symbols.length)]
    const precip = wet ? 0.5 + rand() * 9 : 0

    // UV follows the season and latitude, and is dampened by cloud or rain
    const clearSky = symbol <= 2
    const uvPeak = Math.max(0, 1 + (10 - 7 * latitudeCooling) * (0.5 + 0.5 * season * hemisphere))
    const uv = uvPeak * (clearSky ? 1 : 0.5) * (wet ? 0.6 : 1)

    const windSpeed = 1.5 + rand() * 6 + (wet ? 2 : 0)
    const windGusts = windSpeed * (1.4 + rand() * 0.6)

    return {
        't_min_2m_24h:C': round(tMin),
        't_max_2m_24h:C': round(tMax),
        'precip_24h:mm': round(precip),
        'uv:idx': round(uv),
        'weather_symbol_24h:idx': symbol,
        'wind_speed_10m:ms': round(windSpeed),
        'wind_dir_10m:d': Math.round(rand() * 359),
        'wind_gusts_10m_24h:ms': round(windGusts),
        ...(() => {
            const { sunrise, sunset } = getSunTimes(date, lat, lon)
            return { 'sunrise:sql': sunrise, 'sunset:sql': sunset }
        })(),
    }
}

const PARAMETERS = [
    'weather_symbol_24h:idx',
    't_min_2m_24h:C',
    't_max_2m_24h:C',
    'precip_24h:mm',
    'uv:idx',
    'wind_speed_10m:ms',
    'wind_dir_10m:d',
    'wind_gusts_10m_24h:ms',
    'sunrise:sql',
    'sunset:sql',
]

/**
 * Builds a Meteomatics-shaped response for the given dates.
 * @param {string[]} dates dates in the format YYYY-MM-DD
 * @param {number|string} lat latitude of the location
 * @param {number|string} lon longitude of the location
 * @returns {object} an object with the same structure as the Meteomatics JSON response
 */
const getDemoWeatherData = (dates, lat, lon) => {
    const latitude = Number(lat) || 0
    const longitude = Number(lon) || 0
    const valuesByDate = dates.map(date => ({ date, values: getDayValues(date, latitude, longitude) }))

    return {
        version: 'demo',
        status: 'OK',
        data: PARAMETERS.map(parameter => ({
            parameter,
            coordinates: [{
                lat: latitude,
                lon: longitude,
                dates: valuesByDate.map(({ date, values }) => ({
                    date: `${date}T00:00:00Z`,
                    value: values[parameter],
                })),
            }],
        })),
    }
}

export default getDemoWeatherData
