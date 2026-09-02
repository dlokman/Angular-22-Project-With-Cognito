import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExternalLayout } from './external-layout';

describe('ExternalLayout', () => {
  let component: ExternalLayout;
  let fixture: ComponentFixture<ExternalLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
