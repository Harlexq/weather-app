import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./ui/pages/signup/signup.module').then((m) => m.SignupModule),
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
