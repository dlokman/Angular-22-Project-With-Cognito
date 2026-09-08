

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth-service';

@Component({
  imports: [],
  selector: 'app-callback',
  styleUrl: './callback.css',
  templateUrl: './callback.html',
})
export class Callback {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    // withAppInitializerAuthCheck()
    // 1) handles redirect from Cognito /auth/callback?code=...
    // 2) triggers the authentication process and exchanges the authorization code for tokens (id, access, refresh)
    // 3) stores tokens (id, access, refresh) in oidc library's storage using sessionstorage by default

    // autoLoginPartialRoutesGuard (auto-login guard)
    // This guard automatically triggers the login process if the user is not authenticated.
    // The auto-login guard also preserves the originally requested protected route and restores it after a successful login, so this component must not redirect
    // on success.

    // If callback processing did not authenticate the user (for example, Cognito returned an OAuth/OIDC error), send the user to the public
    // not-authorized page instead of starting another login loop.

    if (!this.authService.authenticated().isAuthenticated) {
      void this.router.navigateByUrl('/not-authorized', { replaceUrl: true });  // void ignores the returned Promise
    }
  }
}
