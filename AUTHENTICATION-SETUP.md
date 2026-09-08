# Angular 22 + Cognito Managed Login + AgentCore CUSTOM_JWT

This project has been converted from the temporary IAM/AWS-SDK AgentCore invocation to:

- Angular 22
- `angular-auth-oidc-client` 22.x
- Cognito Managed Login
- Authorization Code Flow + PKCE
- Cognito refresh-token rotation
- `sessionStorage` (library default)
- `autoLoginPartialRoutesGuard`
- automatic refresh-token renewal
- direct HTTPS `fetch()` to AgentCore Runtime
- `Authorization: Bearer <Cognito access token>`
- AgentCore Runtime `CUSTOM_JWT` inbound authentication

## 1. Install dependencies

Run:

```bash
npm install
```

The old `@aws-sdk/client-bedrock-agentcore` dependency was removed because OAuth/JWT AgentCore invocations use HTTPS rather than the AWS SDK.

## 2. This project uses Build Once Deploy Many
Meaning we build it once and we deploy the same build to Dev, QA and Prod

files involves in this are

Github Actions will replace variables in config.template.js per environment and paste that in config.js
public>config>config.js
public>config>config.template.js

Index.html will then load those settings in window.APP_CONFIG
index.html (references <script src="config/config.js"></script>)

src>app>core>config-service
these settings will be made available as an injectable service via ConfigService
src>app>core>config-service>config-service.ts
src>app>core>config-service>config.interface.ts

To include in a file
1) Either inject as a service via ConfigService to use it
2) if you cannot inject it e.g in app.config.ts then access it via windows object (this is made available via index.html)
   const config = (window as any).APP_CONFIG;

## 3. Cognito callback/sign-out URLs

The current Angular configuration expects:

```text
Callback URL: http://localhost:4200/auth/callback
Sign-out URL: http://localhost:4200/logout
```

These must exactly match the Cognito app-client configuration.

For production, add the HTTPS production equivalents to Cognito and deploy matching Angular URLs.

## 4. AgentCore Runtime JWT configuration

Configure the Runtime with `CUSTOM_JWT`. Use the SSM values created by the CloudFormation template:

```json
{
  "authorizerType": "CUSTOM_JWT",
  "authorizerConfiguration": {
    "customJwtAuthorizer": {
      "discoveryUrl": "<value of /app/customersupport/agentcore/cognito_discovery_url>",
      "allowedClients": [
        "<value of /app/customersupport/agentcore/web_client_id>"
      ],
      "allowedScopes": [
        "<value of /app/customersupport/agentcore/cognito_auth_scope>"
      ]
    }
  }
}
```

If the Strands workload needs to inspect the inbound JWT itself, keep `Authorization` in the Runtime request-header allowlist. Authentication is still enforced by AgentCore before the request reaches the workload.

## 5. Browser CORS for the Strands/AgentCore workload

The browser makes a cross-origin request from Angular to AgentCore. The Python runtime application must allow the Angular origin and the request headers used by the browser.

For a `BedrockAgentCoreApp`/FastAPI-backed runtime, add CORS middleware in the Python application that owns `app`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
    ],
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=[
        "Authorization",
        "Content-Type",
        "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
    ],
)
```

Use only your exact HTTPS Angular origin(s) in production; do not use `*` for an internal enterprise application.

If your AgentCore runtime framework does not automatically answer the browser preflight, add an `OPTIONS /invocations` handler as required by your runtime framework.

## 6. Authentication flow

1. User opens `/chat` (or another protected route).
2. `withAppInitializerAuthCheck()` initializes/restores OIDC state.
3. `autoLoginPartialRoutesGuard` sees an unauthenticated user and starts authorization.
4. Browser goes to Cognito Managed Login.
5. Cognito returns to `/auth/callback?code=...&state=...`.
6. `angular-auth-oidc-client` exchanges the code using PKCE, validates the response, and stores its OIDC state/tokens in `sessionStorage`.
7. The library/guard restores the originally requested route.
8. Before access-token expiry, the library renews using the Cognito refresh token.
9. Every AgentCore request asks `AuthService` for the current access token immediately before `fetch()`.
10. The request sends `Authorization: Bearer <access token>` to AgentCore.

## 7. Multiple tabs

The project enables:

```ts
useRefreshTokenLock: true
```

This serializes refresh-token renewal across tabs using the Web Locks API. It is useful with Cognito refresh-token rotation.

The library still uses `sessionStorage` by default; the application intentionally does not switch token storage to `localStorage`.

## 8. Logout

The navbar calls `AuthService.logout()`.

Logout:

1. broadcasts a logout event to other same-origin application tabs;
2. each tab attempts to revoke its own Cognito refresh token and clears its local OIDC state;
3. the initiating tab navigates the browser to Cognito `/logout`;
4. Cognito clears the Managed Login browser session;
5. Cognito redirects to the public Angular `/logout` route.

The cross-tab broadcast contains only the word `logout`; no token is shared between tabs.

## 9. Test sequence

After deploying Cognito and the JWT-enabled AgentCore Runtime:

1. `npm install`
2. fill `aws.local.ts`
3. `npm start`
4. open `http://localhost:4200/chat`
5. confirm redirect to Cognito Managed Login
6. sign in
7. confirm return through `/auth/callback`
8. confirm `/chat` loads
9. DevTools > Application > Session Storage: verify OIDC state is in session storage, not local storage
10. send a chat prompt
11. DevTools > Network: verify AgentCore request has an `Authorization: Bearer ...` header
12. confirm the token payload is an access token and has the expected `client_id` and custom scope
13. refresh the browser and verify login remains valid for the tab
14. open/duplicate additional tabs and test requests
15. allow a token renewal to occur and verify later AgentCore requests use the renewed access token
16. click Sign out and verify `/logout` is reached
17. click Sign in and verify the Cognito flow starts again

## 10. Security check

Before committing or deploying, search the project for:

```text
AKIA
accessKeyId
secretAccessKey
AWS_SECRET_ACCESS_KEY
refresh_token
localStorage.setItem
```

The frontend must not contain AWS access credentials or manually persist Cognito tokens.

## 11. Important credential rotation note

The uploaded test project contained browser-side AWS access credentials from the previous IAM demo. Those values have been removed from the modified project, and generated/cache/git-history directories are excluded from the returned ZIP. If those credentials were ever valid, rotate/deactivate them in IAM immediately because frontend credentials must be treated as exposed once committed, built, or shared.
