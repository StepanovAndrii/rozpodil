import { Routes } from '@angular/router';
import { userRoomsResolver } from './core/resolvers/user-rooms/user-rooms.resolver';
import { userResolver } from './core/resolvers/user/user.resolver';
import { authGuard } from './core/guards/auth/auth.guard';
import { userRoomResolver } from './core/resolvers/user-room/user-room.resolver';
import { roomUsersResolver } from './core/resolvers/room-users/room-users.resolver';
import { roomResolver } from './core/resolvers/room-resolver/room.resolver';
import { roomTasksResolver } from './core/resolvers/room-tasks-resolver/room-tasks.resolver';

export const routes: Routes = [
    {path: '',
        redirectTo: 'room',
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
    {path: 'room', loadComponent: () =>
        import('./features/room/room-actions/room-actions.component').then(c => c.RoomActionsComponent),
        resolve: {
            user: userResolver,
            room: userRoomResolver
        },
        canActivate: [authGuard]
    },
    {path: 'room/create', loadComponent: () =>
        import('./features/room/room-creation/room-creation.component').then(component => component.RoomCreationComponent),
        canActivate: [authGuard]
    },
    {path: 'room/join', loadComponent: () =>
        import('./features/room/room-joining/room-joining.component').then(component => component.RoomJoiningComponent),
        canActivate: [authGuard]
    },
    {path: 'room/:id', loadComponent: () => 
        import('./features/home/home.component').then(component => component.HomeComponent),
        canActivate: [authGuard],
        resolve: {
           userRooms: userRoomsResolver,
           user: userResolver,
           tasks: roomTasksResolver
        }
    },
    {path: 'room/:id/settings', loadComponent: () => 
        import('./features/room-settings/room-settings.component').then(component => component.RoomSettingsComponent),
        resolve: {
            roomUsersRoles: roomUsersResolver,
            room: roomResolver
        },
        canActivate: [authGuard]
    },
    {path: '**', redirectTo: 'room', pathMatch: 'full'}
];