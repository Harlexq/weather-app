import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { DailyWeather, DailyWeatherData } from 'src/app/models/DailyWeather';
import { WeeklyWeather } from 'src/app/models/WeeklyWeather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  citfySearhForm!: FormGroup;
  activeButton: string = 'daily';
  currentWeather: CurrentWeather | null = null;
  dailyWeather: DailyWeather | null = null;
  weeklyWeather: WeeklyWeather | null = null;
  dailyWeatherData: DailyWeatherData | null = null;
  iconLink: string = 'https://www.weatherbit.io/static/img/icons/';

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.citfySearh();
    this.route.queryParams.subscribe((params) => {
      const city = params['city'];
      if (city) {
        this.Name.setValue(city);
        this.loadWeatherData(city);
      }
    });
  }

  setActiveButton(activeButton: string) {
    this.activeButton = activeButton;
  }

  citfySearh() {
    this.citfySearhForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  search() {
    const city = this.Name.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city },
      queryParamsHandling: 'merge',
    });
  }

  loadWeatherData(city: string) {
    // this.weatherService.getCurrentWeather(city).subscribe({
    //   next: (res: CurrentWeather) => {
    //     this.currentWeather = res;
    //   },
    //   error: (err) => console.log(err),
    // });

    // this.weatherService.getDailyWeather(city).subscribe({
    //   next: (res: DailyWeather) => {
    //     this.dailyWeather = res;
    //     if (res.data && res.data.length > 0) {
    //       this.dailyWeatherData = res.data[0];
    //     }
    //   },
    //   error: (err) => console.log(err),
    // });

    // this.weatherService.getWeeklyWeather(city).subscribe({
    //   next: (res: WeeklyWeather) => {
    //     this.weeklyWeather = res;
    //   },
    //   error: (err) => console.log(err),
    // });
  }

  weeklyReadMore(dateTime: string) {
    
  }

  clearInput() {
    this.Name.reset();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city: null },
      queryParamsHandling: 'merge',
    });
  }

  get Name(): FormControl {
    return this.citfySearhForm.get('name') as FormControl;
  }
}
