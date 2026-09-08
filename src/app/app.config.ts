/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './core/auth-service/auth-service';
import { provideCopilotKit } from '@copilotkit/angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom} from 'rxjs';

import { authConfig } from './auth/auth.config';
import { provideAuth, withAppInitializerAuthCheck } from 'angular-auth-oidc-client';

export const appInitializerFn = async (): Promise<void> => {
  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);
  // const appSettingsService = inject(AppSettingsService);

  try {
    const authResult = await firstValueFrom(
      // Checks the current OIDC authentication state during Angular startup.
      // Processes a Cognito callback if the current URL contains an authorization response
      // (for example, /auth/callback?code=... or an OAuth/OIDC error).
      // Restores existing authentication state from the library's configured storage.
      // Route guards then use the resulting auth state to allow access or start login.
      oidcSecurityService.checkAuth(),
    );

    // if (authResult.isAuthenticated) {
    //   await appSettingsService.load();   // if appSettings must load after Authentication but before Page Load
    // }

  } catch (error) {
      console.error('OIDC authentication initialization failed:', error);
      await router.navigate(['/app-initialization-error']);
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    //using oidcSecurityService.checkAuth above so this is not needed
    //provideAuth(authConfig, withAppInitializerAuthCheck())
    provideAuth(authConfig),
    provideAppInitializer(appInitializerFn),
    provideCopilotKit({
      selfManagedAgents: {},
      enableInspector: false,
    })
  ],
};
