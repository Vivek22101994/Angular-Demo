import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nameform } from './nameform';

describe('Nameform', () => {
  let component: Nameform;
  let fixture: ComponentFixture<Nameform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nameform],
    }).compileComponents();

    fixture = TestBed.createComponent(Nameform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
