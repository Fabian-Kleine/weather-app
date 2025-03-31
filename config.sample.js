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