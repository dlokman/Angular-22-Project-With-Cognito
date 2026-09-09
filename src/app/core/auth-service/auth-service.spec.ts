import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  AuthenticatedResult,
  OidcSecurityService,
  UserDataResult,
} from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;

  const oidcSecurityServiceMock = {
    authenticated: signal<AuthenticatedResult>({
      isAuthenticated: true,
      allConfigsAuthenticated: [],
    }),

    userData: signal<UserDataResult>({
      userData: null,
      allUserData: [],
    }),

    // Used internally by AuthService.login()
    authorize: vi.fn(),

    // Used internally by AuthService.getAccessToken()
    getAccessToken: vi.fn(() => of('access-token')),

    // Used internally by AuthService.getIdToken()
    getIdToken: vi.fn(() => of('id-token')),

    // Used internally by AuthService.logout()
    revokeRefreshToken: vi.fn(() => of(true)),
    logoffLocal: vi.fn(),
  };

  const routerMock = {
    url: '/chat-1',

    // Used internally by AuthService.logout()
    navigate: vi.fn(() => Promise.resolve(true)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: OidcSecurityService,
          useValue: oidcSecurityServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
