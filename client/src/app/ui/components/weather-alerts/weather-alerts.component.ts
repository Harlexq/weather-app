import { Component } from '@angular/core';
import { WeatherAlert } from 'src/app/models/WeatherAlert';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'weather-alerts',
  templateUrl: './weather-alerts.component.html',
  styleUrls: ['./weather-alerts.component.scss'],
})
export class WeatherAlertsComponent {
  alerts: WeatherAlert[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          };
          this.getWeatherAlerts(coords);
        },
        (error) => {
          console.error('Error getting user location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getWeatherAlerts(coords: { lon: number; lat: number }): void {
    this.weatherService.getSevereWeatherAlerts(coords).subscribe(
      (alerts) => {
        this.alerts = alerts;
        this.notifyUsers(alerts);
      },
      (error) => {
        console.error('Error fetching weather alerts', error);
      }
    );
  }

  notifyUsers(alerts: WeatherAlert[]): void {
    alerts.forEach((alert) => {
      window.alert(
        `Severe Weather Alert: ${alert.alerts[0].title}\n${alert.alerts[0].description}`
      );
    });
  }
}
