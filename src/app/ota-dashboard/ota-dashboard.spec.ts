import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtaDashboard } from './ota-dashboard';

describe('OtaDashboard', () => {
  let component: OtaDashboard;
  let fixture: ComponentFixture<OtaDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtaDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(OtaDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
