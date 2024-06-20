import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from './input-control/input-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainButtonComponent } from './buttons/main-button/main-button.component';
import { RouterLink } from '@angular/router';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [
    InputControlComponent,
    MainButtonComponent,
    PreloaderComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  exports: [InputControlComponent, MainButtonComponent, PreloaderComponent],
})
export class SharedModule {}
