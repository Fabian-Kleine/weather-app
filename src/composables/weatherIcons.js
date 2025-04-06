const getWeatherIcon = (weatherType, languageSet) => {
    const weatherIcons = {
        '1': { //Sunny
            icon: 'bi-sun-fill',
            iconColor: '#FFD700',
            weatherDescription: languageSet.weatherData.weatherDescriptions.sunny,
            backgroundPosition: 'bottom',
        },
        '2': { //Light clouds
            icon: './icons/cloud-sun-fill.svg',
            isSVGIcon: true,
            weatherDescription: languageSet.weatherData.weatherDescriptions.lightClouds,
            backgroundPosition: 'bottom',
        },
        '3': { //partly Cloudy
            icon: 'bi-cloud-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.partlyClouds,
            backgroundPosition: 'center',
        },
        '4': { //Cloudy
            icon: 'bi-clouds-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.cloudy,
            backgroundPosition: 'center',
        },
        '5': { //Rainy
            icon: 'bi-cloud-rain-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.rainy,
            backgroundPosition: 'top',
        },
        '6': { //Rain and Snow
            icon: 'bi-cloud-rain-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.rainAndSnow,
            backgroundPosition: 'top',
        },
        '7': { //Snow
            icon: './icons/cloud-snow-fill.svg',
            isSVGIcon: true,
            weatherDescription: languageSet.weatherData.weatherDescriptions.snow,
            backgroundPosition: 'top',
        },
        '8': { //Rain shower
            icon: 'bi-cloud-rain-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.rainShower,
            backgroundPosition: 'top',
        },
        '9': { //Snow shower
            icon: './icons/cloud-snow-fill.svg',
            isSVGIcon: true,
            weatherDescription: languageSet.weatherData.weatherDescriptions.snowShower,
            backgroundPosition: 'top',
        },
        '10': { //Sleet shower
            icon: 'bi-cloud-rain-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.rainShower,
            backgroundPosition: 'top',
        },
        '11': { //Light Fog
            icon: 'bi-cloud-fog2-fill',
            iconColor: '#A9B4C0',
            weatherDescription: languageSet.weatherData.weatherDescriptions.fog,
            backgroundPosition: 'center',
        },
        '12': { //Fog
            icon: 'bi-cloud-fog2-fill',
            iconColor: '#A9B4C0',
            weatherDescription: languageSet.weatherData.weatherDescriptions.fog,
            backgroundPosition: 'center',
        },
        '13': { //Freezing Rain
            icon: 'bi-cloud-rain-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.rainy,
            backgroundPosition: 'top',
        },
        '14': { //Thunderstorm
            icon: './icons/cloud-lightning-rain-fill.svg',
            isSVGIcon: true,
            weatherDescription: languageSet.weatherData.weatherDescriptions.thunderstorm,
            backgroundPosition: 'top',
        },
        '15': { //Drizzle
            icon: 'bi-cloud-rain-fill',
            iconColor: '#FFF',
            weatherDescription: languageSet.weatherData.weatherDescriptions.rainy,
            backgroundPosition: 'top',
        },
        '16': { //Sandstorm
            icon: 'bi-cloud-fog2-fill',
            iconColor: '#A9B4C0',
            weatherDescription: languageSet.weatherData.weatherDescriptions.sandstorm,
            backgroundPosition: 'top',
        }
    };

    return weatherIcons[weatherType] || weatherIcons['4'];
}

export { getWeatherIcon }
