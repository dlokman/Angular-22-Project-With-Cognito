import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppInitializationError } from './app-initialization-error';

describe('AppInitializationError', () => {
  let component: AppInitializationError;
  let fixture: ComponentFixture<AppInitializationError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInitializationError],
    }).compileComponents();

    fixture = TestBed.createComponent(AppInitializationError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
