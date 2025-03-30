import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    { path: 'login', loadComponent: () => 
        import('../features/authentication/login-page/login-page.component').then(c => c.LoginPageComponent) 
    },
    { path: 'registration', loadComponent: () => 
        import('../features/authentication/register-page/register-page.component').then(c => c.RegisterPageComponent) 
    }
];
