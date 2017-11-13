import { TestBed, inject } from '@angular/core/testing';

import { AdblockService } from './adblock.service';

describe('AdblockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdblockService]
    });
  });

  it('should be created', inject([AdblockService], (service: AdblockService) => {
    expect(service).toBeTruthy();
  }));
});
