import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';

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
    ToastModule,
  ],
})
export class FeedbackModule {}
