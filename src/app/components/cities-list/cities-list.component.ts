import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {

  citiesList = [];
  weatherData: any;
  selectedCity: any;
  public isLoading: boolean = false;

  constructor(
    private weatherService: WeatherService ,
    ) { }

  ngOnInit(): void {
    this.getCitiesList();
  }

  getCitiesList() {
    this.weatherService.getCitiesJson().subscribe(data => {
      this.citiesList = data;
      console.log(this.citiesList);
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  getCurrentWeather(lat, long) {
    this.isLoading = true;
    this.weatherService.getCurrentWeather(lat, long).subscribe(res => {
    this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  getWeatherForecast(lat,long) {
    this.weatherService.getWeatherForecast(lat,long).subscribe(res => {
    }, error => {
      console.log(error);
    })
  }

  onSelectCity(itemId: number) {
    this.selectedCity = this.citiesList.find(city => city.id === Number(itemId));
    this.getCurrentWeather(this.selectedCity.lat, this.selectedCity.lon);
    // this.getWeatherForecast(this.selectedCity.lat, this.selectedCity.lon);
  }

}
