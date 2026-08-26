import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NameHandler } from './name-handler';

describe('NameHandler', () => {
  let component: NameHandler;
  let fixture: ComponentFixture<NameHandler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(NameHandler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
