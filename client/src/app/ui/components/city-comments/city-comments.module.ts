import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityCommentsComponent } from './city-comments.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCommentsComponent } from './list-comments/list-comments.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CityCommentsComponent, ListCommentsComponent],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
  ],
  exports: [CityCommentsComponent],
})
export class CityCommentsModule {}
