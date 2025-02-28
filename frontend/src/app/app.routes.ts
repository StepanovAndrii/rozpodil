import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CallbackPageComponent } from './pages/callback-page/callback-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    {path: 'auth/login', component: LoginPageComponent},
    {path: 'auth/callback', component: CallbackPageComponent}
];
