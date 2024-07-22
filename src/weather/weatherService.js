import axios from 'axios';
import { GEO_DB_URL, GEO_DB_OPTIONS, WEATHER_API_URL } from '../utils/constants.js';

export class weatherService {
    async fetchWeatherApiData(city) {
        try {
            const { latitude, longitude } = await this.fetchCityCoordinates(city);
            const response = await axios.get(`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}&units=metric`);
            response.data.cityName = city.charAt(0).toUpperCase() + city.slice(1);

            return response.data;
        } catch (error) {
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
        } catch (error) {
            console.error(`Error in fetchCityCoordinates: ${error}`);
            throw error;
        } 
    }

};
