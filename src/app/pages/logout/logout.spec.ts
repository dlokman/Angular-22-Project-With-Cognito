import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../../core/auth-service/auth-service';
import { Logout } from './logout';

describe('Logout', () => {
  let component: Logout;
  let fixture: ComponentFixture<Logout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logout],
      providers: [
        {
          provide: AuthService,
          useValue: { login: () => undefined },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
