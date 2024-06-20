import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from '../../components/breadcrumb/breadcrumb.module';
import { UsersComponent } from './users/users.component';
import { ChartModule } from 'primeng/chart';
import { BlogsComponent } from './blogs/blogs.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [HomeComponent, UsersComponent, BlogsComponent, CommentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    BreadcrumbModule,
    ChartModule,
  ],
})
export class HomeModule {}
