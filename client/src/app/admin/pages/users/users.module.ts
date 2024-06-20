import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../components/breadcrumb/breadcrumb.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [UsersComponent, UserEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
    ]),
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    RadioButtonModule,
  ],
})
export class UsersModule {}
