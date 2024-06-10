import { Component, Input } from '@angular/core';
import { CurrentWeather } from 'src/app/models/CurrentWeather';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent {
  @Input() currentWeather: CurrentWeather | null = null;
  iconLink: string = 'https://www.weatherbit.io/static/img/icons/';
}
