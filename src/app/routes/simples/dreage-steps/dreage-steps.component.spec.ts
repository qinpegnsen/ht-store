import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreageStepsComponent } from './dreage-steps.component';

describe('DreageStepsComponent', () => {
  let component: DreageStepsComponent;
  let fixture: ComponentFixture<DreageStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreageStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreageStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
