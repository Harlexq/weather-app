import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./ui/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
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
        path: 'weather-conditions',
        loadChildren: () =>
          import(
            './ui/pages/weather-conditions/weather-conditions.module'
          ).then((m) => m.WeatherConditionsModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./ui/pages/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./ui/pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
