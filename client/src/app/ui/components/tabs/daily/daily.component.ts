import { Component, Input } from '@angular/core';
import { DailyWeather, DailyWeatherData } from 'src/app/models/DailyWeather';
import { GetDayNameService } from 'src/app/services/get-day-name.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent {
  @Input({ required: true }) dailyWeather: DailyWeather | null = null;
  @Input({ required: true }) dailyWeatherData: DailyWeatherData | null = null;
  iconLink: string = 'https://www.weatherbit.io/static/img/icons/';

  constructor(private getDayNameService: GetDayNameService) {}

  getDayName(dateString: string): string {
    return this.getDayNameService.getDayName(dateString);
  }
}
