import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'landing',
		loadComponent: () => import('./pages/landing/landing.component').then((m) => m.LandingComponent)
	},
	{
		path: 'login',
		loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent)
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
	},
	{
		path: 'inventory',
		loadComponent: () => import('./pages/inventory/inventory.component').then((m) => m.InventoryComponent)
	},
	{
		path: 'orders',
		loadComponent: () => import('./pages/orders/orders.component').then((m) => m.OrdersComponent)
	},
	{
		path: 'scan',
		loadComponent: () => import('./pages/scan/scan.component').then((m) => m.ScanComponent)
	},
	{
		path: 'users',
		loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent)
	},
	{
		path: 'profile',
		loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent)
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'landing'
	},
	{
		path: '**',
		redirectTo: 'landing'
	}
];
