import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {

  citiesList = [];
  currentCityWeather: any;
  weatherForecast: any;
  selectedCity: any;
  isLoading: boolean = false;

  constructor(
    private weatherService: WeatherService
  ) { }

  async ngOnInit() {
    await this.getCitiesList();
  }

  async getCitiesList() {
    this.isLoading = true;
    try {
      this.citiesList = await this.weatherService.getCitiesJson();
      this.selectedCity = this.citiesList[0];
      this.getCurrentWeather(this.citiesList[0].lat, this.citiesList[0].lon);
      this.getWeatherForecast(this.citiesList[0].lat, this.citiesList[0].lon);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  async getCurrentWeather(lat, long) {
    try {
      this.currentCityWeather = await this.weatherService.getCurrentWeather(lat, long);
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  async getWeatherForecast(lat, long) {
    this.isLoading = true;
    try {
      const completeWeatherData = await this.weatherService.getWeatherForecast(lat, long);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const next3DaysWeather = completeWeatherData.list.reduce((acc, forecast) => {
        const forecastDate = new Date(forecast.dt * 1000);
        if (forecastDate.getTime() > currentTimestamp) {
          const formattedDate = forecastDate.toISOString().split('T')[0];
          if (!acc[formattedDate]) {
            acc[formattedDate] = forecast;
        }
        }
        return acc;
      }, {});
  
      const next3DaysForecasts = Object.values(next3DaysWeather).slice(1, 4);
      this.weatherForecast = next3DaysForecasts;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  onSelectCity(itemId: number) {
    this.selectedCity = this.citiesList.find(city => city.id === Number(itemId));
    this.getCurrentWeather(this.selectedCity.lat || this.citiesList[0].lat, this.selectedCity.lon || this.citiesList[0].lon);
    this.getWeatherForecast(this.selectedCity.lat || this.citiesList[0].lat, this.selectedCity.lon || this.citiesList[0].lon);
  }

}
