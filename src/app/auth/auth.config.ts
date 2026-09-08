/* eslint-disable @typescript-eslint/no-explicit-any */
import { PassedInitialConfig, LogLevel  } from 'angular-auth-oidc-client';

// Reference: https://nice-hill-002425310.azurestaticapps.net/docs/documentation/configuration

const config = (window as any).APP_CONFIG;

export const authConfig: PassedInitialConfig = {
  config: {
    authority: config.cognito.authority,                           // User Pool's OIDC issuer/authority
    redirectUrl: config.cognito.redirectUrl,                       // Cognito Callback URL
    postLogoutRedirectUri: config.cognito.postLogoutRedirectUri,   // Logout URL
    clientId: config.cognito.clientId,                             // WebClient app client ID
    scope: config.cognito.scope,                                   // OpenID Connect scopes + Custom scopes (resource-server-b37271e0/read)
    responseType: 'code',                                          // Cognito is configured for Authorization code grant
    silentRenew: true,      // Automatically renew access tokens. 30s before access token expiration, it'll send refresh token to get new id token, access token and refresh token
    useRefreshToken: true,  // Use Cognito refresh token instead of iframe renewal. Use refresh token to get new id token, access token and refresh token. Cognito has to be setup properly to support this.
    renewTimeBeforeTokenExpiresInSeconds: 30,  // 30 seconds before access token expiration, it'll send refresh token to get new id token, access token and refresh token
    logLevel: LogLevel.Debug,  //Local Dev debugging via Chrome Console. Not needed for QA & Prod

    useRefreshTokenLock: true, // If set to true, refresh token requests are serialized across browser tabs using the Web Locks API, so only one tab refreshes at a time while the others reuse the result.
    disableRefreshTokenOfflineAccessScopeWarning: true  // basically saying: I know I’m using refresh tokens without offline_access; don’t warn me about it.”
  }
};
