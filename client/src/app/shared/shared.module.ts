import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from './input-control/input-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputControlComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputControlComponent],
})
export class SharedModule {}
