import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeocodingService } from './geocoding.service';
import { CurrentWeather, CurrentWeatherData } from '../models/CurrentWeather';
import { DailyWeather } from '../models/DailyWeather';
import { WeeklyWeather } from '../models/WeeklyWeather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherBitApiUrl: string = environment.weatherBitApiUrl;
  weatherBitApiKey: string = environment.weatherBitApiKey;
  weatherBitApiHost: string = 'weatherbit-v1-mashape.p.rapidapi.com';

  constructor(
    private http: HttpClient,
    private geocodingService: GeocodingService
  ) {}

  headers: HttpHeaders = new HttpHeaders()
    .set('X-RapidAPI-Key', this.weatherBitApiKey)
    .set('X-RapidAPI-Host', this.weatherBitApiHost);

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    return this.geocodingService.getCoordinates(city).pipe(
      switchMap((coords) => {
        const params = new HttpParams()
          .set('lon', String(coords.lon))
          .set('lat', String(coords.lat))
          .set('units', 'metric')
          .set('lang', 'tr');

        return this.http.get<CurrentWeatherData>(
          `${this.weatherBitApiUrl}/current`,
          {
            params,
            headers: this.headers,
          }
        );
      }),
      map((res) => res.data[0])
    );
  }

  getDailyWeather(city: string): Observable<DailyWeather> {
    return this.geocodingService.getCoordinates(city).pipe(
      switchMap((coords) => {
        const params = new HttpParams()
          .set('lon', String(coords.lon))
          .set('lat', String(coords.lat))
          .set('units', 'metric')
          .set('lang', 'tr');

        return this.http.get<DailyWeather>(
          `${this.weatherBitApiUrl}/forecast/daily`,
          {
            params: params,
            headers: this.headers,
          }
        );
      }),
      map((res) => {
        res.data = res.data.slice(0, 1);
        return res;
      })
    );
  }

  getWeeklyWeather(city: string): Observable<WeeklyWeather> {
    return this.geocodingService.getCoordinates(city).pipe(
      switchMap((coords) => {
        const params = new HttpParams()
          .set('lon', String(coords.lon))
          .set('lat', String(coords.lat))
          .set('units', 'metric')
          .set('lang', 'tr');

        return this.http.get<WeeklyWeather>(
          `${this.weatherBitApiUrl}/forecast/daily`,
          {
            params: params,
            headers: this.headers,
          }
        );
      }),
      map((res) => {
        res.data = res.data.slice(0, 7);
        return res;
      })
    );
  }
}
