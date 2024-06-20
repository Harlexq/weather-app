import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'weather-sidebar',
  templateUrl: './weather-sidebar.component.html',
  styleUrls: ['./weather-sidebar.component.scss'],
})
export class WeatherSidebarComponent {
  citfySearhForm!: FormGroup;
  activeButton: string = 'daily';
  currentWeather: CurrentWeather | null = null;
  iconLink: string = 'https://www.weatherbit.io/static/img/icons/';
  cityQueryParam: string | null = null;
  loading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
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

  onCitySelected(city: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city },
      queryParamsHandling: 'merge',
    });
    this.loadWeatherData(city);
  }

  loadWeatherData(city: string) {
    this.loading = true;
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (res: CurrentWeather) => {
        this.currentWeather = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
}
