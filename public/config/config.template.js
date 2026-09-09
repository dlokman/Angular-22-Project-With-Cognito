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
  agentCore1: {
    runtimeArn: '${AGENTCORE_RUNTIME_ARN_1}', //'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/YOUR_RUNTIME_ID',
    endpoint: '${AGENTCORE_RUNTIME_ENDPOINT_1}',      //'https://bedrock-agentcore.us-east-1.amazonaws.com',
    qualifier: 'DEFAULT',
  },
  agentCore2: {
    runtimeArn: '${AGENTCORE_RUNTIME_ARN_2}', //'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/YOUR_RUNTIME_ID',
    endpoint: '${AGENTCORE_RUNTIME_ENDPOINT_2}',      //'https://bedrock-agentcore.us-east-1.amazonaws.com',
    qualifier: 'DEFAULT',
  }
};
