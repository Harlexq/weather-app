import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CitysComponent } from './citys/citys.component';

@NgModule({
  declarations: [HomeComponent, CitysComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    RouterLink,
  ],
})
export class HomeModule {}
