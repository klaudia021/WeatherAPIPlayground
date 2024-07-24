import axios from 'axios';
import { GEO_DB_URL, GEO_DB_OPTIONS, WEATHER_API_URL } from '../utils/constants.js';
export class WeatherService {
    async fetchWeatherApiData(searchCity) {
        try {
            const { latitude, longitude, city } = await this.fetchCityCoordinates(searchCity);
            const response = await axios.get(`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}&units=metric`);
            const weatherData = response.data;
            weatherData.cityName = city;
            return this.parseWeatherApiResponse(weatherData);
        }
        catch (error) {
            console.error(`Error in fetchWeatherApiData: ${error}`);
            throw error;
        }
    }
    async fetchCityCoordinates(city) {
        try {
            const response = await axios.get(`${GEO_DB_URL}cities?namePrefix=${city}`, GEO_DB_OPTIONS);
            if (!response.data || !response.data.data || response.data.data.length === 0) {
                throw new Error('No data found');
            }
            return response.data.data[0];
        }
        catch (error) {
            console.error(`Error in fetchCityCoordinates: ${error}`);
            throw error;
        }
    }
    parseWeatherApiResponse(response) {
        return {
            cityName: response.cityName.charAt(0).toUpperCase() + response.cityName.slice(1),
            icon: response.weather[0].icon,
            temperature: response.main.temp,
            description: response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1),
            humidity: response.main.humidity,
            feelsLike: response.main.feels_like,
        };
    }
}
;
