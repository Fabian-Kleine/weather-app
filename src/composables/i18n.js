const de = {
    language: 'Deutsch',
    locale: 'de-DE',
    Navbar: {
        search: 'Postleitzahl oder Ort eingeben',
        location: 'Standort benutzen',
    },
    weatherData: {
        sunrise: 'Sonnenaufgang',
        sunset: 'Sonnenuntergang',
        uvIndex: 'UV-Index',
        wind: 'Windstärke',
        windgusts: 'Windböen',
        precipitation: 'Niederschlag',
        weatherDescriptions: {
            sunny: 'Sonnig',
            lightClouds: 'Leicht bewölkt',
            partlyClouds: 'Bewölkt',
            cloudy: 'Stark bewölkt',
            rainy: 'Regnerisch',
            rainAndSnow: 'Schneeregen',
            snow: 'Schnee',
            rainShower: 'Regenschauer',
            snowShower: 'Schneeschauer',
            thunderstorm: 'Gewitter',
            fog: 'Nebel',
            sandstorm: 'Sandsturm',
        },
        uvIndexDescriptions: {
            low: 'Niedrig',
            moderate: 'Mittel',
            high: 'Hoch',
            veryHigh: 'Sehr hoch',
            extreme: 'Extrem',
        }
    },
    days: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
    ],
    today: 'Heute',
    graph: {
        minTemperature: 'Min. Temperatur',
        maxTemperature: 'Max. Temperatur',
        precipitation: 'Niederschlag',
    },
    cookieConsent: {
        title: 'Cookie-Einwilligung',
        description: 'Wir verwenden Cookies und geben Standortdaten an Nominatim und Meteomatics weiter, um dir präzise Wetterinformationen bereitzustellen. Durch Klicken auf \'Akzeptieren\' stimmen sie der Nutzung und Weitergabe dieser Daten zu',
        accept: 'Akzeptieren',
        decline: 'Ablehnen',
    },
    loading: 'Lade Wetterdaten...'
}

const en = {
    language: 'English',
    locale: 'en-GB',
    Navbar: {
        search: 'Enter postal code or city',
        location: 'Use location',
    },
    weatherData: {
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        uvIndex: 'UV Index',
        wind: 'Wind strength',
        windgusts: 'Wind gusts',
        precipitation: 'Precipitation',
        weatherDescriptions: {
            sunny: 'Sunny',
            lightClouds: 'Light clouds',
            partlyClouds: 'Partly cloudy',
            cloudy: 'Cloudy',
            rainy: 'Rainy',
            rainAndSnow: 'Rain and snow',
            snow: 'Snow',
            rainShower: 'Rain shower',
            snowShower: 'Snow shower',
            thunderstorm: 'Thunderstorm',
            fog: 'Fog',
            sandstorm: 'Sandstorm',
        },
        uvIndexDescriptions: {
            low: 'Low',
            moderate: 'Moderate',
            high: 'High',
            veryHigh: 'Very high',
            extreme: 'Extreme',
        }
    },
    days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
    today: 'Today',
    graph: {
        minTemperature: 'Min. temperature',
        maxTemperature: 'Max. temperature',
        precipitation: 'Precipitation',
    },
    cookieConsent: {
        title: 'Cookie consent',
        description: 'We use cookies and share location data with Nominatim and Meteomatics to provide you with accurate weather information. By clicking \'Accept\' you agree to the use and sharing of this data',
        accept: 'Accept',
        decline: 'Decline',
    },
    loading: 'Loading weather data...'
}

const getLanguageSet = (lang) => {
    switch (lang) {
        case 'de':
            return de
        case 'en':
            return en
        default:
            return en
    }
}

export default getLanguageSet;