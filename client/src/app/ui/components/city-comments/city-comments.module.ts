import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityCommentsComponent } from './city-comments.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CityCommentsComponent],
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  exports: [CityCommentsComponent],
})
export class CityCommentsModule {}
