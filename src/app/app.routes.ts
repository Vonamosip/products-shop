import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => LoginComponent
      },
      {
        path: 'register',
        loadComponent: () => RegisterComponent
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Error404Component
  }
];
