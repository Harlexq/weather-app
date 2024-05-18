import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeedbackComponent,
      },
    ]),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class FeedbackModule {}
