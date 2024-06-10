import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterLink, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, BannerComponent],
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
  ],
})
export class HomeModule {}
