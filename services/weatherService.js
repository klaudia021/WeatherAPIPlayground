const axios = require('axios');
const {GEO_DB_URL, GEO_DB_OPTIONS, WEATHER_API_URL} = require('../utils/api');

const fetchWeatherApiData = async (city) => {
    try {
        const { latitude, longitude } = await fetchCityCoordinates(city);
        const response = await axios.get(`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}&units=metric`);
        response.data.cityName = city;
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(`Error in fetchWeatherApiData: ${error}`);
        throw error;
    }
};

const fetchCityCoordinates = async (city) => {
    try {
        const response = await axios.get(`${GEO_DB_URL}cities?namePrefix=${city}`, GEO_DB_OPTIONS);
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            throw new Error('No data found');
        }

        return response.data.data[0];
    } catch (error) {
        console.error(`Error in fetchCityCoordinates: ${error}`);
        throw error;
    }
};

module.exports = fetchWeatherApiData