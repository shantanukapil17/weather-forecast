import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private  apiKey : '54b26081acba6412c04637e7a32f32e5';
  constructor(private http: HttpClient) { }

  getCitiesJson(): Promise<any> {
    return this.http.get('assets/cities-fr.json').toPromise();
  }

  getCurrentWeather(lat: number, lon: number): Promise<any> {
    const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }

  getWeatherForecast(lat: number, lon: number): Promise<any> {
    const url = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }

}
