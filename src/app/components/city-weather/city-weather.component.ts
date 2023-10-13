import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {
  @Input() weatherForecast = [];

  constructor(
    private weatherService: WeatherService
  ) { }
  

  ngOnInit() {
    console.log(this.weatherForecast);
  }

  getDayName(timestamp: number): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(timestamp * 1000);
    return daysOfWeek[date.getDay()];
  }
  

  

}
