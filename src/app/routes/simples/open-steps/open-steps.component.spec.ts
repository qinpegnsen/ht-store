import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenStepsComponent } from './open-steps.component';

describe('OpenStepsComponent', () => {
  let component: OpenStepsComponent;
  let fixture: ComponentFixture<OpenStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
