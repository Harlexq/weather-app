import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { DailyWeather, DailyWeatherData } from 'src/app/models/DailyWeather';
import { WeeklyWeather, WeeklyWeatherData } from 'src/app/models/WeeklyWeather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'weather-forecasts-main',
  templateUrl: './weather-forecasts-main.component.html',
  styleUrls: ['./weather-forecasts-main.component.scss'],
})
export class WeatherForecastsMainComponent {
  activeButton: string = 'daily';
  currentWeather: CurrentWeather | null = null;
  dailyWeather: DailyWeather | null = null;
  weeklyWeather: WeeklyWeather | null = null;
  weeklyWeatherData: WeeklyWeatherData | null = null;
  dailyWeatherData: DailyWeatherData | null = null;
  iconLink: string = 'https://www.weatherbit.io/static/img/icons/';
  cityQueryParam: string | null = null;
  loading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const city = params['city'];
      this.cityQueryParam = city;
      if (city) {
        this.loadWeatherData(city);
      }
    });
  }

  setActiveButton(activeButton: string) {
    this.activeButton = activeButton;
  }

  loadWeatherData(city: string) {
    this.loading = true;
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (res: CurrentWeather) => {
        this.currentWeather = res;
        this.checkLoading();
      },
      error: (err) => {
        console.log(err);
        this.checkLoading();
      },
    });

    this.weatherService.getDailyWeather(city).subscribe({
      next: (res: DailyWeather) => {
        this.dailyWeather = res;
        if (res.data && res.data.length > 0) {
          this.dailyWeatherData = res.data[0];
        }
        this.checkLoading();
      },
      error: (err) => {
        console.log(err);
        this.checkLoading();
      },
    });

    this.weatherService.getWeeklyWeather(city).subscribe({
      next: (res: WeeklyWeather) => {
        this.weeklyWeather = res;
        this.checkLoading();
      },
      error: (err) => {
        console.log(err);
        this.checkLoading();
      },
    });
  }

  checkLoading() {
    if (this.currentWeather && this.dailyWeather && this.weeklyWeather) {
      this.loading = false;
    }
  }
}
