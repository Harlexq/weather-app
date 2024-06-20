import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherTrendsComponent } from './weather-trends.component';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { WeatherTrendsFormComponent } from './weather-trends-form/weather-trends-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherTrendsComponent, WeatherTrendsFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WeatherTrendsComponent,
      },
    ]),
    ChartModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class WeatherTrendsModule {}
