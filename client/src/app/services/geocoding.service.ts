import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  openWeatherApiUrl: string = environment.openWeatherApiUrl;
  openWeatherApiKey: string = environment.openWeatherApiKey;
  googleGeocodingApiUrl: string = environment.googleGeocodingApiUrl;
  googleApiKey: string = environment.googleGeocodingApiKey;

  constructor(private http: HttpClient) {}

  getCoordinates(city: string): Observable<{ lat: number; lon: number }> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.openWeatherApiKey)
      .set('units', 'metric')
      .set('lang', 'tr');

    return this.http
      .get<any>(`${this.openWeatherApiUrl}/direct`, { params })
      .pipe(
        map((response) => {
          const results = response[0];
          return {
            lat: results.lat,
            lon: results.lon,
          };
        })
      );
  }

  getCityName(lat: number, lon: number): Observable<string> {
    const params = new HttpParams()
      .set('latlng', `${lat},${lon}`)
      .set('key', this.googleApiKey);

    return this.http
      .get<any>(`${this.googleGeocodingApiUrl}/geocode/json`, { params })
      .pipe(
        map((response) => {
          const results = response.results;
          for (let result of results) {
            for (let component of result.address_components) {
              if (component.types.includes('administrative_area_level_1')) {
                return component.long_name;
              }
            }
          }
          throw new Error('Şehir Bulunamadı.');
        })
      );
  }
}
