window.APP_CONFIG = {
  region: 'us-east-1',
  cognito: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_UqVgmTUWo',  // User Pool's OIDC issuer/authority
    clientId: '48rmngdj0llmlglsj2ttjothee',                                       // WebClient app client ID
    domain: 'https://us-east-1b37271e0.auth.us-east-1.amazoncognito.com',         // Cognito Domain
    discoveryUrl: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_UqVgmTUWo/.well-known/openid-configuration', // Cognito Discovery URL
    scope: 'openid profile email resource-server-b37271e0/read',  // OpenID Connect scopes + Custom scopes (resource-server-b37271e0/read)
    redirectUrl: 'http://localhost:4200/auth/callback',           // Cognito Callback URL
    postLogoutRedirectUri: 'http://localhost:4200/logout'         // Logout URL
  },
  agentCore1: {
    runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:742752463290:runtime/restaurantassistant_restaurant_assistant-0zuMLq5kJ2', //'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/YOUR_RUNTIME_ID',
    endpoint: 'https://bedrock-agentcore.us-east-1.amazonaws.com',    //'https://bedrock-agentcore.us-east-1.amazonaws.com',
    qualifier: 'DEFAULT'
  },
  agentCore2: {
    //runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:742752463290:runtime/AngularInterruptTest_MyAgent-FShQwX60wH', // Interrupt Test
    runtimeArn: 'arn:aws:bedrock-agentcore:us-east-1:742752463290:runtime/FlightBookingSupport_FlightBookingAgent-Lr8HrM9ArJ', //'arn:aws:bedrock-agentcore:us-east-1:123456789012:runtime/YOUR_RUNTIME_ID',
    endpoint: 'https://bedrock-agentcore.us-east-1.amazonaws.com',    //'https://bedrock-agentcore.us-east-1.amazonaws.com',
    qualifier: 'DEFAULT',
  }
};
