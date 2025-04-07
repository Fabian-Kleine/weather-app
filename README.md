# Weather

A Simple Weather App I made with a colleague to get more familiar with vue3.

The frontend was mostly done by me and the API functionalities were mostly written by my colleague.

## Setup

Copy `config.sample.js` and rename it to `config.js`.

Then, enter the username and password for the *Meteomatics* API:

```javascript
const config = {
    //Meteomatics
    meteomatics:{
        username: '',
        password: '',
        apiurl: 'https://api.meteomatics.com/',
        parameter: 'weather_symbol_24h:idx,t_min_2m_24h:C,t_max_2m_24h:C,precip_24h:mm,uv:idx,wind_speed_10m:ms,wind_dir_10m:d,wind_gusts_10m_24h:ms,sunrise:sql,sunset:sql/'
    },

    //Nominatim
    nominatim: {
        apiurlsearch: 'https://nominatim.openstreetmap.org/search?',
        apiurlreverse: 'https://nominatim.openstreetmap.org/reverse?',
        responseParameter: 'format=json&addressdetails=1&limit=1'
    }
}

export { config }
```

Start the application with the command `npm run dev` for development, or for production use the commands:

```
npm run build
npm run preview
```

## Features

- Search by postal code or city name
- The following weather data is displayed:
    - Full location description (postal code, city, state, etc.)
    - Min., Max., and Avg. temperature
    - Weather condition as an icon and description
    - Sunrise time
    - Sunset time
    - UV index
    - Wind speed with an arrow indicating wind direction
    - Wind gusts
    - Precipitation
- Current time in the navigation bar
- Weather and Avg. temperature for the next four days
- Background brightness adjusts based on the current weather condition
- Geocode localization
- Save the last request in LocalStorage
- Temperature graph
- i18n

## Tools and Packages
- **meteomatics** (weather API)
- **nominatim** (geo API to convert locations to coordinates)
- **tz-lookup** package to get the local time of the searched location
- **chart.js** and **vue-chart-3** to create weather-diagram
- **bootstrap, bootstrap-icons** and **bootstrap-vue-next** for styling