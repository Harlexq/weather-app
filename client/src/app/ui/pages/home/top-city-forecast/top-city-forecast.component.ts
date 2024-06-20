import { Component } from '@angular/core';
import { City } from 'src/app/models/City';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'top-city-forecast',
  templateUrl: './top-city-forecast.component.html',
  styleUrls: ['./top-city-forecast.component.scss'],
})
export class TopCityForecastComponent {
  citys: City[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit(): void {
    this.getCitys();
  }

  getCitys() {
    this.http.get<City[]>('citys', (res) => {
      this.citys = res;
    });
  }
}
