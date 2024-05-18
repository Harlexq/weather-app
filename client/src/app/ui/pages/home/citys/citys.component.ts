import { Component } from '@angular/core';
import { LatLon } from 'src/app/models/LatLon';
import { Weather } from 'src/app/models/Weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'home-citys',
  templateUrl: './citys.component.html',
  styleUrls: ['./citys.component.scss'],
})
export class CitysComponent {
  city: string = 'gaziantep';
  weatherData: any;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getCity();
  }

  getCity() {
    this.weatherService.getLatLon(this.city).subscribe({
      next: (res: LatLon[]) => {
        if (res.length > 0) {
          const lat = res[0].lat;
          const lon = res[0].lon;
          this.weatherService.getCurrentWeather(lat, lon).subscribe({
            next: (weatherRes: any) => {
              this.weatherData = weatherRes;
              console.log('Weather response:', weatherRes);
            },
            error: (err) => {
              this.errorMessage = 'Hava durumu verisi alınamadı.';
            },
          });
        } else {
          this.errorMessage = 'Şehir bulunamadı.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Şehir bilgisi alınamadı.';
      },
    });
  }
}
