import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastsComponent } from './weather-forecasts.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from '../../components/tabs/tabs.module';
import { CityCommentsModule } from '../../components/city-comments/city-comments.module';
import { SidebarsModule } from '../../components/sidebars/sidebars.module';
import { WeatherForecastsMainComponent } from './weather-forecasts-main/weather-forecasts-main.component';
import { EmptyCityComponent } from './weather-forecasts-main/empty-city/empty-city.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    WeatherForecastsComponent,
    WeatherForecastsMainComponent,
    EmptyCityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WeatherForecastsComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    CityCommentsModule,
    SidebarsModule,
    SharedModule,
  ],
})
export class WeatherForecastsModule {}
