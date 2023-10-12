import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {
  @Input() lat : number;
  @Input() lon : number;

  constructor(
    private weatherService: WeatherService
  ) { }
  

  ngOnInit() {
    console.log(this.lat, this.lon);
  }

  

}
