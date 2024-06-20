import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UILayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherAlertsModule } from '../components/weather-alerts/weather-alerts.module';
@NgModule({
  declarations: [UILayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    WeatherAlertsModule,
  ],
})
export class LayoutModule {}
