import { TestBed, inject } from '@angular/core/testing';

import { TccService } from './tcc.service';

describe('TccService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TccService]
    });
  });

  it('should be created', inject([TccService], (service: TccService) => {
    expect(service).toBeTruthy();
  }));
});
