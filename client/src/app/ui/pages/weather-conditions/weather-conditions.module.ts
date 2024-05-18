import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherConditionsComponent } from './weather-conditions.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherConditionsComponent],
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
  ],
})
export class WeatherConditionsModule {}
