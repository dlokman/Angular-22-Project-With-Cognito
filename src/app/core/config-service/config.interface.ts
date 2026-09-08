export interface AppConfig {
  region: string;
  cognito: {
    authority: string;
    clientId: string;
    domain: string;
    scope: string;
    redirectUrl: string;
    postLogoutRedirectUri: string;
  };
  agentCore: {
    runtimeArn: string;
    endpoint: string;
    qualifier: string;
  }
}
