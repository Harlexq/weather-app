import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeeklyWeather } from 'src/app/models/WeeklyWeather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-trends',
  templateUrl: './weather-trends.component.html',
  styleUrls: ['./weather-trends.component.scss'],
})
export class WeatherTrendsComponent {
  weeklyWeatherData: any;
  cityName: string = '';

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cityName = params['city'];
      if (this.cityName) {
        this.fetchWeatherData(this.cityName);
      } else {
        this.clearWeatherData();
      }
    });
  }

  fetchWeatherData(cityName: string) {
    this.weatherService.getWeeklyWeather(cityName).subscribe({
      next: (res: WeeklyWeather) => {
        this.weeklyWeatherData = {
          labels: res.data.map((day) => day.valid_date),
          datasets: [
            {
              label: 'Sıcaklık (°C)',
              data: res.data.map((day) => day.temp),
              fill: false,
              borderColor: '#f44336',
              pointBackgroundColor: '#f44336',
            },
            {
              label: 'Nem (%)',
              data: res.data.map((day) => day.rh),
              fill: false,
              borderColor: '#03a9f4',
              pointBackgroundColor: '#03a9f4',
            },
            {
              label: 'Rüzgar Hızı (m/s)',
              data: res.data.map((day) => day.wind_spd),
              fill: false,
              borderColor: '#4caf50',
              pointBackgroundColor: '#4caf50',
            },
            {
              label: 'Basınç (hPa)',
              data: res.data.map((day) => day.pres),
              fill: false,
              borderColor: '#9c27b0',
              pointBackgroundColor: '#9c27b0',
            },
            {
              label: 'Görüş Mesafesi (km)',
              data: res.data.map((day) => day.vis),
              fill: false,
              borderColor: '#e91e63',
              pointBackgroundColor: '#e91e63',
            },
          ],
        };
      },
    });
  }

  clearWeatherData() {
    this.weeklyWeatherData = null;
  }
}
