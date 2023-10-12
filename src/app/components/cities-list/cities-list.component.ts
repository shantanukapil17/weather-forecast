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
      console.log(this.currentCityWeather)
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  async getWeatherForecast(lat, long) {
    this.isLoading = true;
    try {
      this.weatherForecast = await this.weatherService.getWeatherForecast(lat, long);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  onSelectCity(itemId: number) {
    this.selectedCity = this.citiesList.find(city => city.id === Number(itemId));
    this.getCurrentWeather(this.selectedCity.lat || this.citiesList[0].lat, this.selectedCity.lon || this.citiesList[0].lon);
    this.getWeatherForecast(this.selectedCity.lat, this.selectedCity.lon);
  }

}
