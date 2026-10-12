import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerDemo } from './timer-demo';

describe('TimerDemo', () => {
  let component: TimerDemo;
  let fixture: ComponentFixture<TimerDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(TimerDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
