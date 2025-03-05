import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/authentication/login-page/login-page.component';
import { LoginCallbackPageComponent } from './features/authentication/login-callback-page/login-callback-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {path: 'auth', component: LoginPageComponent},
    {path: 'auth/callback', component: LoginCallbackPageComponent}
];
