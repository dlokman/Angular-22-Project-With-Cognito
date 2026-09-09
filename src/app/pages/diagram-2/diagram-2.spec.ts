import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Diagram2 } from './diagram-2';

describe('Diagram2', () => {
  let component: Diagram2;
  let fixture: ComponentFixture<Diagram2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diagram2],
    }).compileComponents();

    fixture = TestBed.createComponent(Diagram2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
