import 'dotenv/config';
import express from 'express';
import { WeatherService } from './weather/weatherService.js';
import { WeatherController } from './weather/weatherController.js';
const app = express();
const PORT = process.env.PORT || 3000;
const weatherServiceInstance = new WeatherService();
new WeatherController(app, weatherServiceInstance);
app.use(express.static('public'));
try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
catch (error) {
    console.log('Error starting server: ', error);
}
