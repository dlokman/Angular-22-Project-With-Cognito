/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './core/auth-service/auth-service';
import { provideCopilotKit } from '@copilotkit/angular';

export const appInitializerFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Promise((resolve) => {
    authService.authenticate().then(
      () =>  {
        resolve(true)
      },
      (err: any) => {
        router.navigate(['/app-initialization-error']);
        resolve(true);
      }
    );
  });
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(appInitializerFn),
    provideCopilotKit({
      selfManagedAgents: {},
      enableInspector: false
    })
  ]
};
