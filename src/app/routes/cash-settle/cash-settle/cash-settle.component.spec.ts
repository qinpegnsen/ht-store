import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSettleComponent } from './cash-settle.component';

describe('CashSettleComponent', () => {
  let component: CashSettleComponent;
  let fixture: ComponentFixture<CashSettleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashSettleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
