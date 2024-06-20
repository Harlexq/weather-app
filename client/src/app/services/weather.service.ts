import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeocodingService } from './geocoding.service';
import { CurrentWeather, CurrentWeatherData } from '../models/CurrentWeather';
import { DailyWeather } from '../models/DailyWeather';
import { WeeklyWeather } from '../models/WeeklyWeather';
import { WeatherAlert } from '../models/WeatherAlert';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  weatherBitApiUrl: string = environment.weatherBitApiUrl;
  weatherBitApiKey: string = environment.weatherBitApiKey;

  constructor(
    private http: HttpClient,
    private geocodingService: GeocodingService
  ) {}

  createParams(coords: { lon: number; lat: number }): HttpParams {
    return new HttpParams()
      .set('lon', String(coords.lon))
      .set('lat', String(coords.lat))
      .set('key', this.weatherBitApiKey)
      .set('units', 'metric')
      .set('lang', 'tr');
  }

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    return this.geocodingService.getCoordinates(city).pipe(
      switchMap((coords) => {
        const params = this.createParams(coords);

        return this.http.get<CurrentWeatherData>(
          `${this.weatherBitApiUrl}/current`,
          { params: params }
        );
      }),
      map((res) => res.data[0])
    );
  }

  getDailyWeather(city: string): Observable<DailyWeather> {
    return this.geocodingService.getCoordinates(city).pipe(
      switchMap((coords) => {
        const params = this.createParams(coords);

        return this.http.get<DailyWeather>(
          `${this.weatherBitApiUrl}/forecast/daily`,
          { params: params }
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
        const params = this.createParams(coords);

        return this.http.get<WeeklyWeather>(
          `${this.weatherBitApiUrl}/forecast/daily`,
          { params: params }
        );
      }),
      map((res) => {
        res.data = res.data.slice(0, 7);
        return res;
      })
    );
  }

  getSevereWeatherAlerts(coords: {
    lon: number;
    lat: number;
  }): Observable<WeatherAlert[]> {
    const params = this.createParams(coords);

    return this.http
      .get<{ alerts: WeatherAlert[] }>(`${this.weatherBitApiUrl}/alerts`, {
        params: params,
      })
      .pipe(map((res) => res.alerts));
  }
}
