import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DredgeComponent } from './dredge.component';

describe('DredgeComponent', () => {
  let component: DredgeComponent;
  let fixture: ComponentFixture<DredgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DredgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DredgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
