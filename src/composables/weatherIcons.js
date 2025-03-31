const weatherIcons = {
    '1': { //Sunny
        icon: 'bi-sun-fill',
        iconColor: '#FFD700',
        weatherDescription: 'Sonnig',
        backgroundPosition: 'bottom',
    },
    '2': { //Light clouds
        icon: '/icons/cloud-sun-fill.svg',
        isSVGIcon: true,
        weatherDescription: 'Leicht Bewölkt',
        backgroundPosition: 'bottom',
    },
    '3': { //partly Cloudy
        icon: 'bi-cloud-fill',
        iconColor: '#FFF',
        weatherDescription: 'Bewölkt',
        backgroundPosition: 'center',
    },
    '4': { //Cloudy
        icon: 'bi-clouds-fill',
        iconColor: '#FFF',
        weatherDescription: 'Stark Bewölkt',
        backgroundPosition: 'center',
    },
    '5': { //Rainy
        icon: 'bi-cloud-rain-fill',
        iconColor: '#FFF',
        weatherDescription: 'Regnerisch',
        backgroundPosition: 'top',
    },
    '6': { //Rain and Snow
        icon: 'bi-cloud-rain-fill',
        iconColor: '#FFF',
        weatherDescription: 'Schneeregen',
        backgroundPosition: 'top',
    },
    '7': { //Snow
        icon: '/icons/cloud-snow-fill.svg',
        isSVGIcon: true,
        weatherDescription: 'Schnee',
        backgroundPosition: 'top',
    },
    '8': { //Rain shower
        icon: 'bi-cloud-rain-fill',
        iconColor: '#FFF',
        weatherDescription: 'Regnerisch',
        backgroundPosition: 'top',
    },
    '9': { //Snow shower
        icon: '/icons/cloud-snow-fill.svg',
        isSVGIcon: true,
        weatherDescription: 'Schnee',
        backgroundPosition: 'top',
    },
    '10': { //Sleet shower
        icon: 'bi-cloud-rain-fill',
        iconColor: '#FFF',
        weatherDescription: 'Regnerisch',
        backgroundPosition: 'top',
    },
    '11': { //Light Fog
        icon: 'bi-cloud-fog2-fill',
        iconColor: '#A9B4C0',
        weatherDescription: 'Nebelig',
        backgroundPosition: 'center',
    },
    '12': { //Fog
        icon: 'bi-cloud-fog2-fill',
        iconColor: '#A9B4C0',
        weatherDescription: 'Nebelig',
        backgroundPosition: 'center',
    },
    '13': { //Freezing Rain
        icon: 'bi-cloud-rain-fill',
        iconColor: '#FFF',
        weatherDescription: 'Regnerisch',
        backgroundPosition: 'top',
    },
    '14': { //Thunderstorm
        icon: '/icons/cloud-lightning-rain-fill.svg',
        isSVGIcon: true,
        weatherDescription: 'Gewitter',
        backgroundPosition: 'top',
    },
    '15': { //Drizzle
        icon: 'bi-cloud-rain-fill',
        iconColor: '#FFF',
        weatherDescription: 'Regnerisch',
        backgroundPosition: 'top',
    },
    '16': { //Sandstorm
        icon: 'bi-cloud-fog2-fill',
        iconColor: '#A9B4C0',
        weatherDescription: 'Sandsturm',
        backgroundPosition: 'top',
    }
}

const getWeatherIcon = (weatherType) => {
    return weatherIcons[weatherType] || weatherIcons['4'];
}

export { getWeatherIcon }
