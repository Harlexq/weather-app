import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherSidebarComponent } from './weather-sidebar/weather-sidebar.component';
import { WeatherSidebarFormComponent } from './weather-sidebar/weather-sidebar-form/weather-sidebar-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [WeatherSidebarComponent, WeatherSidebarFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule],
  exports: [WeatherSidebarComponent],
})
export class SidebarsModule {}
