import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchMapDemo } from './switch-map-demo';

describe('SwitchMapDemo', () => {
  let component: SwitchMapDemo;
  let fixture: ComponentFixture<SwitchMapDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchMapDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchMapDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
