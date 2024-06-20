import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from '../../components/breadcrumb/breadcrumb.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { DialogModule } from 'primeng/dialog';
import { BlogSharedComponent } from './blog-shared/blog-shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [BlogsComponent, BlogDetailComponent, BlogSharedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogsComponent,
      },
    ]),
    TableModule,
    ButtonModule,
    ToastModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
    FileUploadModule,
  ],
})
export class BlogsModule {}
