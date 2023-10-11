import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '54b26081acba6412c04637e7a32f32e5';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getCitiesJson(): Observable<any> {
    return this.http.get('assets/cities-fr.json');
  }

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getWeatherForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

}
