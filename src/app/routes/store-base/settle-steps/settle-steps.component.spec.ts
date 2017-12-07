import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleStepsComponent } from './settle-steps.component';

describe('SettleStepsComponent', () => {
  let component: SettleStepsComponent;
  let fixture: ComponentFixture<SettleStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettleStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
