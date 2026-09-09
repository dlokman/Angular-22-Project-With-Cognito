import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth-service';
import { PagesLayout } from './pages-layout';

describe('PagesLayout', () => {
  let component: PagesLayout;
  let fixture: ComponentFixture<PagesLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesLayout],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            userData: signal({
              userData: { name: 'Test User' },
              allUserData: [],
            }),
            logout: () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
