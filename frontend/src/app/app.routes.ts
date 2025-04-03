import { Routes } from '@angular/router';
import { canAccessGuard } from './core/guards/can-access-guard/can-access.guard';
import { taskResolver } from './core/resolvers/task-resolver/task.resolver';

export const routes: Routes = [
    {path: '',
        redirectTo: 'room',
        pathMatch: 'full'
    },
    {path: 'home', loadComponent: () => 
        import('./features/home/home.component').then(component => component.HomeComponent),
        resolve: {
            taskData: taskResolver
        }
    },
    {path: 'room', loadComponent: () =>
        import('./features/room/room-actions/room-actions.component').then(component => component.RoomActionsComponent),
        data: { preload: true }
    },
    {path: 'room/create', loadComponent: () =>
        import('./features/room/room-creation/room-creation.component').then(component => component.RoomCreationComponent),
        canActivate: [canAccessGuard],
        data: { preload: true }
    },
    {path: 'room/join', loadComponent: () =>
        import('./features/room/room-joining/room-joining.component').then(component => component.RoomJoiningComponent),
        canActivate: [canAccessGuard],
        data: { preload: true }
    }
];