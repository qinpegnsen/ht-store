import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPendingShipmentComponent } from './order-pending-shipment.component';

describe('OrderPendingShipmentComponent', () => {
  let component: OrderPendingShipmentComponent;
  let fixture: ComponentFixture<OrderPendingShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPendingShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPendingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
