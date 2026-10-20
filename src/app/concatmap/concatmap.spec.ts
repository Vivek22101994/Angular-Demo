import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Concatmap } from './concatmap';

describe('Concatmap', () => {
  let component: Concatmap;
  let fixture: ComponentFixture<Concatmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Concatmap],
    }).compileComponents();

    fixture = TestBed.createComponent(Concatmap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
