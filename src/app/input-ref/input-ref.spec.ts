import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputRef } from './input-ref';

describe('InputRef', () => {
  let component: InputRef;
  let fixture: ComponentFixture<InputRef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRef],
    }).compileComponents();

    fixture = TestBed.createComponent(InputRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
