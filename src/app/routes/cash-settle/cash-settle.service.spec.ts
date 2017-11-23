import { TestBed, inject } from '@angular/core/testing';

import { CashSettleService } from './cash-settle.service';

describe('CashSettleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashSettleService]
    });
  });

  it('should be created', inject([CashSettleService], (service: CashSettleService) => {
    expect(service).toBeTruthy();
  }));
});
