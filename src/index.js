import dotenv from 'dotenv/config';
import express from 'express';
import { WeatherService } from './weather/weatherService.js';
import { WeatherController } from './weather/weatherController.js';

const app = express();
const PORT = process.env.PORT || 3000;
const weatherServiceInstance = new WeatherService();
const weatherController = new WeatherController(app, weatherServiceInstance);
console.log('weatherController');

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
