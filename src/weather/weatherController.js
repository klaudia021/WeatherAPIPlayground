export class WeatherController {
    app = null;
    service = null;

    constructor(app, service) {
        this.app = app;
        this.service = service;

        this.app.get('/api/data', this.getWeatherData);
    }

    getWeatherData = async (req, res) =>{
        try {
            const searchCity = req.query.city;
            const weatherData = await this.service.fetchWeatherApiData(searchCity);
            res.json({ 
                message: 'Data fetched successfully',
                weatherData: weatherData 
            });
        } catch (error) {
            res.status(400).json({ message: 'Error fetching external data' });
        }
    }
}