import { Route } from "@angular/router";

export const ProfileRoutes: Route = {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(m => m.ProfilePage),
    children: [
        {
            path: 'history',
            loadComponent: () => import('./orders-history/orders-history').then(m => m.OrdersHistoryPage)
        },
        {
            path: 'cart',
            loadComponent: () => import('./cart/cart').then(m => m.CartPage)
        },
        {
            path: 'cart/:cartId',
            loadComponent: () => import('./cart-items/cart-items').then(m => m.CartItemsPage)
        },
        {
            path: 'account',
            loadComponent: () => import('./account/account').then(m => m.AccountPage)
        },
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'cart'
        }
    ]
}