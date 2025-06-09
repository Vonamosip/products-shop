import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/store/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => AuthComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '**',
    component: Error404Component
  }
];
