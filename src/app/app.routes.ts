import { Routes } from '@angular/router';
import { ProfileRoutes } from './page/profile/profile.routes';
import { titleResolverFactory } from './utils/title-resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./page/product/landing/landing').then(m => m.Landing),
        title: 'VerdiQ'
    },
    {
        path: 'login',
        loadComponent: () => import('./page/auth/login/login').then(m => m.LoginPage),
        title: 'Login'
    },
    {
        path: 'register',
        loadComponent: () => import('./page/auth/register/register').then(m => m.RegisterPage),
        title: 'Registro'
    },
    {
        path: 'product/:productId',
        loadComponent: () => import('./page/product/product/product').then(m => m.ProductPage),
        title: titleResolverFactory('product')
    },
    {
        path: 'store/:storeId',
        loadComponent: () => import('./page/store/store/store').then(m => m.StorePage),
        title: titleResolverFactory('store')
    },
    {
        path: 'create-store',
        loadComponent: () => import('./page/store/create-store/create-store').then(m => m.CreateStorePage)
    },
    ProfileRoutes,
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
