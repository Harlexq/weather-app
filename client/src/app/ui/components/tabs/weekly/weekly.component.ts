import { Component, Input } from '@angular/core';
import { WeeklyWeather, WeeklyWeatherData } from 'src/app/models/WeeklyWeather';
import { GetDayNameService } from 'src/app/services/get-day-name.service';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss'],
})
export class WeeklyComponent {
  @Input({ required: true }) weeklyWeather: WeeklyWeather | null = null;
  @Input({ required: true }) weeklyWeatherData: WeeklyWeatherData | null = null;
  iconLink: string = 'https://www.weatherbit.io/static/img/icons/';

  constructor(private getDayNameService: GetDayNameService) {}

  getDayName(dateString: string): string {
    return this.getDayNameService.getDayName(dateString);
  }

  weeklyReadMore(dateTime: string) {
    const data = this.weeklyWeather?.data.find(
      (weather) => weather.datetime === dateTime
    );
    if (data) {
      this.weeklyWeatherData = data;
    }
  }
}
