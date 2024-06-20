import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterLink, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopCityForecastComponent } from './top-city-forecast/top-city-forecast.component';
import { BlogsComponent } from './blogs/blogs.component';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    TopCityForecastComponent,
    BlogsComponent,
    MapComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class HomeModule {}
