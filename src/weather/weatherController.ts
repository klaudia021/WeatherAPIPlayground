import { Express, Request, Response } from 'express';
import { WeatherService } from './weatherService.js';

export class WeatherController {
    private app : Express;
    private service : WeatherService;

    public constructor(app: Express, service: WeatherService) {
        this.app = app;
        this.service = service;

        this.app.get('/api/data', this.getWeatherData);
    }

    private getWeatherData = async (req: Request, res: Response) => {
        try {
            const searchCity = typeof req.query.city === 'string' ? req.query.city : 'defaultCity';
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