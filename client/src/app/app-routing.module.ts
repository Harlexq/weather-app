import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UILayoutComponent } from './ui/layout/layout.component';
import { AdminLayoutComponent } from './admin/layout/layout.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'admin/auth',
    loadChildren: () =>
      import('./admin/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivateChild: [() => inject(AuthService).checkIsAuth('adminToken')],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('./admin/pages/blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'profile-edit',
        loadChildren: () =>
          import('./admin/pages/profile-edit/profile-edit.module').then(
            (m) => m.ProfileEditModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./admin/pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'citys',
        loadChildren: () =>
          import('./admin/pages/citys/citys.module').then((m) => m.CitysModule),
      },
      {
        path: 'comments',
        loadChildren: () =>
          import('./admin/pages/comments/comments.module').then(
            (m) => m.CommentsModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./ui/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: UILayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./ui/pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./ui/pages/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      {
        path: 'profile-edit',
        loadChildren: () =>
          import('./ui/pages/profile-edit/profile-edit.module').then(
            (m) => m.ProfileEditModule
          ),
        canActivate: [() => inject(AuthService).checkIsAuth('token')],
      },
      {
        path: 'weather-forecasts',
        loadChildren: () =>
          import('./ui/pages/weather-forecasts/weather-forecasts.module').then(
            (m) => m.WeatherForecastsModule
          ),
      },
      {
        path: 'weather-trends',
        loadChildren: () =>
          import('./ui/pages/weather-trends/weather-trends.module').then(
            (m) => m.WeatherTrendsModule
          ),
      },
      {
        path: 'map',
        loadChildren: () =>
          import('./ui/pages/map/map.module').then((m) => m.MapModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./ui/pages/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('./ui/pages/blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'blog-detail/:id',
        loadChildren: () =>
          import('./ui/pages/blog-detail/blog-detail.module').then(
            (m) => m.BlogDetailModule
          ),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./admin/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./ui/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
