window.APP_CONFIG = {
  region: 'us-east-1',
  cognito: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_UqVgmTUWo',  // User Pool's OIDC issuer/authority
    clientId: '48rmngdj0llmlglsj2ttjothee',                                       // WebClient app client ID
    domain: 'https://us-east-1b37271e0.auth.us-east-1.amazoncognito.com',         // Cognito Domain
    scope: 'openid profile email resource-server-b37271e0/read',  // OpenID Connect scopes + Custom scopes (resource-server-b37271e0/read)
    redirectUrl: 'http://localhost:4200/auth/callback',           // Cognito Callback URL
    postLogoutRedirectUri: 'http://localhost:4200/logout'         // Logout URL
  },
  agentCore: {
    runtimeArn: 'TODOOOOOOOOOOO', //'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/YOUR_RUNTIME_ID',
    endpoint: 'TODOOOOOOOO',      //'https://bedrock-agentcore.us-east-1.amazonaws.com',
    qualifier: 'DEFAULT',
  }
};
