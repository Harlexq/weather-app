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

  constructor(private http: HttpClient) {}

  getCoordinates(city: string): Observable<{ lat: number; lon: number }> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.openWeatherApiKey)
      .set('units', 'metric')
      .set('lang', 'tr');

    return this.http.get<any>(this.openWeatherApiUrl, { params }).pipe(
      map((response) => {
        const results = response[0];
        return {
          lat: results.lat,
          lon: results.lon,
        };
      })
    );
  }
}
