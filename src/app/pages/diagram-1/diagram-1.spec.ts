import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Diagram1 } from './diagram-1';

describe('Diagram1', () => {
  let component: Diagram1;
  let fixture: ComponentFixture<Diagram1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diagram1],
    }).compileComponents();

    fixture = TestBed.createComponent(Diagram1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
