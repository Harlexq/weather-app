import { Injectable } from '@angular/core';
import { CurrentWeather, CurrentWeatherData } from '../models/CurrentWeather';
import { Observable, map } from 'rxjs';
import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(
    private weatherService: WeatherService,
    private http: HttpClient
  ) {}

  getCurrentWeather(lon: number, lat: number): Observable<CurrentWeather> {
    const params = this.weatherService.createParams({ lon, lat });
    return this.http
      .get<CurrentWeatherData>(
        `${this.weatherService.weatherBitApiUrl}/current`,
        {
          params: params,
        }
      )
      .pipe(map((res) => res.data[0]));
  }
}
