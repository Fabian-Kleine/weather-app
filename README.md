# Weather

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FFabian-Kleine%2Fweather-app%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=dependencies.vue&logo=vue&logoColor=vue&label=Vue&color=%2342b883)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FFabian-Kleine%2Fweather-app%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=devDependencies.vite&logo=vite&logoColor=vite&label=Vite&color=%23646CFF)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ About

A Simple Weather App I made with a colleague to get more familiar with vue3.

The frontend was mostly done by me and the API functionalities were mostly written by him.

## ⭐ Features

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

## 🚀 Tech Stack and Packages

*   **[Vite](https://vite.dev/)**: Build Tool for web applications
*   **[Vue](https://vuejs.org/)**: Frontend Framework
*   **[Bootstrap](https://getbootstrap.com/)**: CSS Framework for responsive design
*   **[Bootstrap Vue Next](https://bootstrap-vue-next.github.io/bootstrap-vue-next/)**: Vue 3 components for Bootstrap 5
*   **[Bootstrap Icons](https://icons.getbootstrap.com/)**: Icon library for Bootstrap
*   **[i18n](https://vue-i18n.intlify.dev/)**: Internationalization plugin for Vue.js
*   **[Chart.js](https://www.chartjs.org/)**: JavaScript charting library
*   **[vue-chart-3](https://vue-chart-3.netlify.app/)**: Vue 3 wrapper for Chart.js
*   **[Meteomatics](https://www.meteomatics.com/)**: Weather API provider
*   **[Nominatim](https://nominatim.org/)**: Geocoding API by OpenStreetMap
*   **[tz-lookup](https://www.npmjs.com/package/tz-lookup)**: Library to get timezone from coordinates

## 🏁 Getting Started

1. **Clone the repository:**

```bash
git clone git@github.com:Fabian-Kleine/weather-app.git
cd weather-app
```

2. **Install dependencies:**

```bash
# Using npm
npm install

# Or using yarn
# yarn install
```

3. **Configuration:**

Copy `config.sample.js` and rename it to `config.js`.

Then, enter the username and password for the *Meteomatics* API:

```javascript
const config = {
    //Meteomatics
    meteomatics:{
        username: '', // meteomatics username
        password: '', // meteomatics password
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

4. **Run the development server:**

```bash
# Using npm
npm run dev

# Or using yarn
# yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) (or the specified port) in your browser to see the result.