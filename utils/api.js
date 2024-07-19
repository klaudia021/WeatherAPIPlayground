
const GEO_DB_URL = `https://wft-geo-db.p.rapidapi.com/v1/geo/`;
const GEO_DB_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.GEO_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
};

const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}`;

module.exports = { GEO_DB_URL, GEO_DB_OPTIONS, WEATHER_API_URL };