import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PagesLayout } from './pages-layout';

describe('PagesLayout', () => {
  let component: PagesLayout;
  let fixture: ComponentFixture<PagesLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesLayout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
