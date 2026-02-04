import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'library',
        pathMatch: 'full'
    },
    {
        path: 'library',
        canActivate: [authGuard],
        loadChildren: () => import('./features/library/library.routes')
            .then(m => m.LIBRARY_ROUTES)
    },
    {
        path: 'track',
        canActivate: [authGuard],
        loadChildren: () => import('./features/track/track.routes')
            .then(m => m.TRACK_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'library'
    }
];
