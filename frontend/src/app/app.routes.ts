import { Routes } from '@angular/router';
import { canAccessGuard } from './core/guards/can-access-guard/can-access.guard';

export const routes: Routes = [
    {path: '',
        redirectTo: 'room',
        pathMatch: 'full'
    },
    {path: 'room', loadComponent: () =>
        import('./features/room/room-actions/room-actions.component').then(component => component.RoomActionsComponent)
    },
    {path: 'room/create', loadComponent: () =>
        import('./features/room/room-creation/room-creation.component').then(component => component.RoomCreationComponent),
        canActivate: [canAccessGuard]
    },
    {path: 'room/join', loadComponent: () =>
        import('./features/room/room-joining/room-joining.component').then(component => component.RoomJoiningComponent),
        canActivate: [canAccessGuard]
    }
];