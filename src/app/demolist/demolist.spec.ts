import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Demolist } from './demolist';

describe('Demolist', () => {
  let component: Demolist;
  let fixture: ComponentFixture<Demolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Demolist],
    }).compileComponents();

    fixture = TestBed.createComponent(Demolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
