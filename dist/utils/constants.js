export const GEO_DB_URL = `https://wft-geo-db.p.rapidapi.com/v1/geo/`;
export const GEO_DB_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.GEO_API_KEY,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
};
export const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_API_KEY}`;
