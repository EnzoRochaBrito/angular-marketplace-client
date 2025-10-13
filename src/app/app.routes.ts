import { Routes } from '@angular/router';
import { ProfileRoutes } from './page/profile/profile.routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./page/product/landing/landing').then(m => m.Landing)
    },
    {
        path: 'login',
        loadComponent: () => import('./page/auth/login/login').then(m => m.LoginPage)
    },
    {
        path: 'register',
        loadComponent: () => import('./page/auth/register/register').then(m => m.RegisterPage)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./page/product/product/product').then(m => m.ProductPage)
    },
    {
        path: 'store/:id',
        loadComponent: () => import('./page/store/store/store').then(m => m.StorePage)
    },
    ProfileRoutes,
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
