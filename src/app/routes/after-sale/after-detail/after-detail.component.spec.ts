import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterDetailComponent } from './after-detail.component';

describe('AfterDetailComponent', () => {
  let component: AfterDetailComponent;
  let fixture: ComponentFixture<AfterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
