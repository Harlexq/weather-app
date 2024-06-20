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
  nominatimApiUrl: string = 'https://nominatim.openstreetmap.org/reverse';

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
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('format', 'json')
      .set('addressdetails', '1');

    return this.http.get<any>(this.nominatimApiUrl, { params }).pipe(
      map((res) => {
        const address = res.address;
        if (address && address.city) {
          return address.city;
        } else if (address && address.town) {
          return address.town;
        } else if (address && address.village) {
          return address.village;
        } else {
          throw new Error('Şehir Bulunamadı.');
        }
      })
    );
  }
}
