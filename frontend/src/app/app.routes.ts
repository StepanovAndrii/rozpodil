import { Routes } from '@angular/router';
import { taskResolver } from './core/resolvers/task-resolver/task.resolver';
import { authGuard } from './core/guards/auth/auth.guard';
import { authMatchGuard } from './core/guards/auth-match.guard';
import { RoomActionsComponent } from './features/room/room-actions/room-actions.component';

export const routes: Routes = [
    {path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {path: 'login', loadComponent: () =>
        import('./features/login/login.component').then(component => component.LoginComponent),
        data: { preload: true }
    },
    {path: 'register', loadComponent: () =>
        import('./features/registration/registration.component').then(component => component.RegistrationComponent)
    },
    {path: 'reset-password', loadComponent: () => 
        import('./features/password-reset/password-reset.component').then(component => component.PasswordResetComponent)
    },
    {path: 'verify-email', loadComponent: () =>
        import('./features/verification-code/verification-code.component').then(component => component.VerificationCodeComponent)
    },
    {path: 'callback', loadComponent: () => 
        import('./features/callback/callback.component').then(component => component.CallbackComponent)
    },
    {path: 'home', loadComponent: () => 
        import('./features/home/home.component').then(component => component.HomeComponent),
        resolve: {
            taskData: taskResolver
        }
    },
    {path: 'room', component: RoomActionsComponent,
        data: { preload: true },
        canActivate: [authGuard]
    },
    {path: 'room/create', loadComponent: () =>
        import('./features/room/room-creation/room-creation.component').then(component => component.RoomCreationComponent)
        
    },
    {path: 'room/join', loadComponent: () =>
        import('./features/room/room-joining/room-joining.component').then(component => component.RoomJoiningComponent)
        
    },
    // {path: '**', redirectTo: 'login', pathMatch: 'full'
    // }
];