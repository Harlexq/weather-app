import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { RouterModule } from '@angular/router';

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
  ],
})
export class FeedbackModule {}
