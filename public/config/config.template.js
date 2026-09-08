window.APP_CONFIG = {
  region: '${REGION}',
  cognito: {
    authority: '${USER_POOL_OIDC_ISSUER}',                         // User Pool's OIDC issuer/authority
    clientId: '${APP_CLIENT_ID}',                                  // WebClient app client ID
    domain: '${COGNITO_DOMAIN}',                                   // Cognito Domain
    scope: 'openid profile email ${RESOURCE_SERVER_ID}/read',      // OpenID Connect scopes + Custom scopes (e.g. resource-server-b37271e0/read)
    redirectUrl: '${ANGULAR_APP_URL}/auth/callback',               // Cognito Callback URL
    postLogoutRedirectUri: '${ANGULAR_APP_URL}/logout'             // Logout URL
  },
  agentCore: {
    runtimeArn: 'TODOOOOOOOOOOO', //'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/YOUR_RUNTIME_ID',
    endpoint: 'TODOOOOOOOO',      //'https://bedrock-agentcore.us-east-1.amazonaws.com',
    qualifier: 'DEFAULT',
  }
};
