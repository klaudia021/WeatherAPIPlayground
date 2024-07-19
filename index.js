require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const fetchWeatherApiData = require('./services/weatherService');


app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
    try {
        const searchCity = req.query.city;
        console.log('searchCity: ' + searchCity);
        const weatherData = await fetchWeatherApiData(searchCity);
        res.json({ 
            message: 'Data fetched successfully',
            weatherData: weatherData 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching external data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
