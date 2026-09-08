import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/chat' },
  {
		path: '',
    loadComponent: () => import('./layout/pages/pages-layout').then(m => m.PagesLayout),
    canActivateChild:  [autoLoginPartialRoutesGuard],   // will redirect to Cognito Login if authenticated
		children: [
      { path: 'chat',
        loadComponent : () => import('./pages/chat/chat').then(m => m.Chat)
      },
      { path: 'diagram',
        loadComponent: () => import('./pages/diagram/diagram').then(m => m.Diagram)
      },
      { path: 'playground',
        loadComponent: () => import('./pages/playground/playground').then(m => m.Playground)
      },
      { path: 'error',
        loadComponent : () => import('./pages/errors/error/error').then(m => m.Error)
      },
		]
	},
  {
		path: '',
    loadComponent: () => import('./layout/external/external-layout').then(m => m.ExternalLayout),
		children: [
			{ path: 'auth/callback',
        loadComponent: () => import('./pages/callback/callback').then(m => m.Callback)
      },
      { path: 'not-authorized',
        loadComponent: () => import('./pages/errors/not-authorized/not-authorized').then(m => m.NotAuthorized)
      },
      { path: 'app-initialization-error',
        loadComponent: () => import('./pages/errors/app-initialization-error/app-initialization-error').then(m => m.AppInitializationError)
      },
      { path: 'logout',
        loadComponent: () => import('./pages/logout/logout').then(m => m.Logout)
      },
		]
	},
  { path: '**', redirectTo: '/chat'} // catch any unfound routes and redirect to chat page
];
