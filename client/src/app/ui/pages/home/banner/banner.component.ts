import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { WeeklyWeather } from 'src/app/models/WeeklyWeather';
import { GetDayNameService } from 'src/app/services/get-day-name.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  iconLink: string = 'https://www.weatherbit.io/static/img/icons/';
  currentWeather: CurrentWeather | null = null;
  weeklyWeather: WeeklyWeather | null = null;
  city: string = 'gaziantep';
  citySearchForm!: FormGroup;

  constructor(
    private weatherService: WeatherService,
    private getDayNameService: GetDayNameService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrent();
    this.getWeekly();
    this.createForm();
  }

  getCurrent() {
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (res: CurrentWeather) => {
        this.currentWeather = res;
      },
      error: (err) => console.log(err),
    });
  }

  getWeekly() {
    this.weatherService.getWeeklyWeather(this.city).subscribe({
      next: (res: WeeklyWeather) => (this.weeklyWeather = res),
      error: (err) => console.log(err),
    });
  }

  getDayName(dateString: string): string {
    return this.getDayNameService.getDayName(dateString);
  }

  createForm() {
    this.citySearchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  search() {
    if (this.citySearchForm.valid) {
      this.router.navigate(['/weather-forecasts'], {
        queryParams: { city: this.Name.value },
      });
    }
  }

  clearInput() {
    this.citySearchForm.reset();
  }

  get Name(): FormControl {
    return this.citySearchForm.get('name') as FormControl;
  }
}
