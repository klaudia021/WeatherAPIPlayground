import dotenv from 'dotenv/config';
import express from 'express';
import { weatherService } from './weather/weatherService.js';

const app = express();
const PORT = process.env.PORT || 3000;
const weatherServiceInstance = new weatherService();

app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
    try {
        const searchCity = req.query.city;
        const weatherData = await weatherServiceInstance.fetchWeatherApiData(searchCity);
        res.json({ 
            message: 'Data fetched successfully',
            weatherData: weatherData 
        });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching external data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
