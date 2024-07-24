export class WeatherController {
    app;
    service;
    constructor(app, service) {
        this.app = app;
        this.service = service;
        this.app.get('/api/data', this.getWeatherData);
    }
    getWeatherData = async (req, res) => {
        try {
            const searchCity = typeof req.query.city === 'string' ? req.query.city : 'defaultCity';
            const weatherData = await this.service.fetchWeatherApiData(searchCity);
            res.json({
                message: 'Data fetched successfully',
                weatherData: weatherData
            });
        }
        catch (error) {
            res.status(400).json({ message: 'Error fetching external data' });
        }
    };
}
