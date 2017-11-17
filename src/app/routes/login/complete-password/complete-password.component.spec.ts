import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePasswordComponent } from './complete-password.component';

describe('CompletePasswordComponent', () => {
  let component: CompletePasswordComponent;
  let fixture: ComponentFixture<CompletePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
