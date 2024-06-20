import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitysComponent } from './citys.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../components/breadcrumb/breadcrumb.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CitySharedComponent } from './city-shared/city-shared.component';

@NgModule({
  declarations: [CitysComponent, CitySharedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CitysComponent,
      },
    ]),
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
  ],
})
export class CitysModule {}
