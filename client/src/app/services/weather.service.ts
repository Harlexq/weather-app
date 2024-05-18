import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LatLon } from '../models/LatLon';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  openWeatherApiUrl: string = environment.openWeatherApiUrl;
  openWeatherApiKey: string = environment.openWeatherApiKey;
  weatherBitApiUrl: string = environment.weatherBitApiUrl;
  weatherBitApiKey: string = environment.weatherBitApiKey;

  constructor(private http: HttpClient) {}

  getLatLon(city: string): Observable<LatLon[]> {
    return this.http.get<LatLon[]>(
      `${this.openWeatherApiUrl}?q=${city}&appid=${this.openWeatherApiKey}&units=metric&lang=tr`
    );
  }

  getCurrentWeather(lat: number, lon: number): Observable<Object> {
    return this.http.get(
      `${this.weatherBitApiUrl}?lon=${lon}&lat=${lat}&units=metric&lang=tr`,
      {
        headers: {
          'X-RapidAPI-Key': this.weatherBitApiKey,
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
        },
      }
    );
  }
}
