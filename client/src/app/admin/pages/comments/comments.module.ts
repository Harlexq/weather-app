import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../components/breadcrumb/breadcrumb.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@NgModule({
  declarations: [CommentsComponent, CapitalizePipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CommentsComponent,
      },
    ]),
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class CommentsModule {}
