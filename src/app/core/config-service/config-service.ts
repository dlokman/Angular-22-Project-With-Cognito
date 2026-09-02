/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@angular/core';
import { AppConfig } from './config.interface';

@Service()
export class ConfigService {
  private readonly config: AppConfig;

  constructor() {
    this.config = (window as any).APP_CONFIG;
  }

  get appConfig(): AppConfig {
    return this.config;
  }
}
