import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionDisplay } from './consumption-display';

describe('ConsumeDisplay', () => {
  let component: ConsumptionDisplay;
  let fixture: ComponentFixture<ConsumptionDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumptionDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumptionDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
