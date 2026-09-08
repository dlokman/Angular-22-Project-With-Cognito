import { Service, Signal, inject } from '@angular/core';
import { AuthenticatedResult, OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { firstValueFrom} from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../config-service/config-service';

const AUTH_BROADCAST_CHANNEL = 'customersupport-auth';
const LOGOUT_MESSAGE = 'logout';

@Service()
export class AuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);
  private readonly configService = inject(ConfigService);

  private readonly authChannel = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(AUTH_BROADCAST_CHANNEL);

 // Signal-based authentication state exposed by angular-auth-oidc-client.
  readonly authenticated: Signal<AuthenticatedResult> = this.oidcSecurityService.authenticated;
  readonly userData: Signal<UserDataResult> = this.oidcSecurityService.userData;

  constructor() {
    // sessionStorage is intentionally tab-scoped. Broadcast logout so signing out in one same-origin tab also clears the OIDC state in the other tabs.
    this.authChannel?.addEventListener('message', (event: MessageEvent<unknown>) => {
      if (event.data === LOGOUT_MESSAGE) {
        void this.handleLogoutFromAnotherTab();
      }
    });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  async getAccessToken(): Promise<string> {
    return firstValueFrom(this.oidcSecurityService.getAccessToken());
  }

  async getIdToken(): Promise<string> {
    return firstValueFrom(this.oidcSecurityService.getIdToken());
  }

  /**
   * Revokes this tab's refresh token when possible, clears local OIDC state,
   * broadcasts logout to other same-origin tabs, and then clears the Cognito
   * Managed Login browser session.
   */
  async logout(): Promise<void> {
    this.authChannel?.postMessage(LOGOUT_MESSAGE);
    await this.revokeRefreshTokenAndClearLocalState();

    const logoutUri = this.configService.appConfig.cognito.postLogoutRedirectUri;
    const cognitoDomain = this.configService.appConfig.cognito.domain;
    const cognitoClientId = this.configService.appConfig.cognito.clientId;

    const cognitoLogoutUrl  =
      `${cognitoDomain}/logout` +
      `?client_id=${encodeURIComponent(cognitoClientId)}` +
      `&logout_uri=${encodeURIComponent(logoutUri)}`;

    window.location.assign(cognitoLogoutUrl); // clearing the Cognito Managed Login browser session cookie.

    // this.router.navigate(['/logout']);
  }

  private async handleLogoutFromAnotherTab(): Promise<void> {
    await this.revokeRefreshTokenAndClearLocalState();

    if (this.router.url !== '/logout') {
      await this.router.navigate(['/logout']);
    }
  }

  // Cognito token revocation is enabled in the app-client configuration.
  private async revokeRefreshTokenAndClearLocalState(): Promise<void> {
    try {
      // Revoking RefreshToken in AWS Cognito, revokes access token as well.
      // https://docs.aws.amazon.com/cognito/latest/developerguide/token-revocation.html
      await firstValueFrom(this.oidcSecurityService.revokeRefreshToken());
    } catch {
      // Deliberately continue with local/session logout.
    } finally {
       // If revocation fails (for example because the session already expired), local logout must still complete.
      this.oidcSecurityService.logoffLocal();
    }
  }
}
