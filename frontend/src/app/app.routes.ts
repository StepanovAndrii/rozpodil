import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'authentication/registration', pathMatch: 'full'},
    {
        path: 'authentication',
        children: [
            {
                path: '',
                loadComponent: () => import('./features/authentication/authentication.component')
                    .then(m => m.AuthenticationComponent),
                children: [
                    { path: 'login', loadComponent: () => 
                        import('./features/authentication/login-page/login-page.component').then(c => c.LoginPageComponent)
                    },
                    { path: 'registration', loadComponent: () => 
                        import('./features/authentication/register-page/register-page.component').then(c => c.RegisterPageComponent)
                    }
                ]
            },
            {
                path: 'email-verification', 
                loadComponent: () => import('./features/authentication/email-confirmation-page/email-confirmation-page.component')
                    .then(c => c.EmailConfirmationPageComponent)
            }
        ]
    }
];
