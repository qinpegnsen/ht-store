import { TestBed, inject } from '@angular/core/testing';

import { RedPacketService } from './red-packet.service';

describe('RedPacketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedPacketService]
    });
  });

  it('should be created', inject([RedPacketService], (service: RedPacketService) => {
    expect(service).toBeTruthy();
  }));
});
