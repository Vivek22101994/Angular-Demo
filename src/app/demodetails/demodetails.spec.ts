import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Demodetails } from './demodetails';

describe('Demodetails', () => {
  let component: Demodetails;
  let fixture: ComponentFixture<Demodetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Demodetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Demodetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
