export interface AgentCoreConfig {
  runtimeArn: string;
  endpoint: string;
  qualifier: string;
}

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
  agentCore1: AgentCoreConfig;
  agentCore2: AgentCoreConfig;
}
