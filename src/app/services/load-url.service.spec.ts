import { TestBed, inject } from '@angular/core/testing';

import { LoadUrlService } from './load-url.service';

describe('LoadUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadUrlService]
    });
  });

  it('should be created', inject([LoadUrlService], (service: LoadUrlService) => {
    expect(service).toBeTruthy();
  }));
});
