import { TestBed, inject } from '@angular/core/testing';

import { SimplesService } from './simples.service';

describe('SimplesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimplesService]
    });
  });

  it('should be created', inject([SimplesService], (service: SimplesService) => {
    expect(service).toBeTruthy();
  }));
});
