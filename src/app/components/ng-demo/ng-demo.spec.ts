import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDemo } from './ng-demo';

describe('NgDemo', () => {
  let component: NgDemo;
  let fixture: ComponentFixture<NgDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
