import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherAlertsComponent } from './weather-alerts.component';

@NgModule({
  declarations: [WeatherAlertsComponent],
  imports: [CommonModule],
  exports: [WeatherAlertsComponent],
})
export class WeatherAlertsModule {}
