import { TestBed, inject } from '@angular/core/testing';

import { OrderPendingShipmentService } from './order-pending-shipment.service';

describe('OrderPendingShipmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderPendingShipmentService]
    });
  });

  it('should be created', inject([OrderPendingShipmentService], (service: OrderPendingShipmentService) => {
    expect(service).toBeTruthy();
  }));
});
