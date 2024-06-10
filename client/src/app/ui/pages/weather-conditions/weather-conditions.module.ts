import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherConditionsComponent } from './weather-conditions.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from '../../components/tabs/tabs.module';
import { CityCommentsModule } from '../../components/city-comments/city-comments.module';
import { SidebarsModule } from '../../components/sidebars/sidebars.module';
import { WeatherConditionsMainComponent } from './weather-conditions-main/weather-conditions-main.component';
import { EmptyCityComponent } from './weather-conditions-main/empty-city/empty-city.component';

@NgModule({
  declarations: [WeatherConditionsComponent, WeatherConditionsMainComponent, EmptyCityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WeatherConditionsComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    CityCommentsModule,
    SidebarsModule,
  ],
})
export class WeatherConditionsModule {}
