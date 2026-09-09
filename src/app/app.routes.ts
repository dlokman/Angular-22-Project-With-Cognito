import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/chat-1' },
  {
		path: '',
    loadComponent: () => import('./layout/pages/pages-layout').then(m => m.PagesLayout),
    canActivateChild:  [autoLoginPartialRoutesGuard],   // will redirect to Cognito Login if authenticated
		children: [
      { path: 'chat-1',
        loadComponent : () => import('./pages/chat-1/chat-1').then(m => m.Chat1)
      },
      { path: 'diagram-1',
        loadComponent: () => import('./pages/diagram-1/diagram-1').then(m => m.Diagram1)
      },
      { path: 'chat-2',
        loadComponent : () => import('./pages/chat-2/chat-2').then(m => m.Chat2)
      },
      { path: 'diagram-2',
        loadComponent: () => import('./pages/diagram-2/diagram-2').then(m => m.Diagram2)
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
  { path: '**', redirectTo: '/chat-1'} // catch any unfound routes and redirect to chat page
];
