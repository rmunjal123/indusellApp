import { TestBed } from '@angular/core/testing';

import { GetbrandsService } from './getbrands.service';

describe('GetbrandsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetbrandsService = TestBed.get(GetbrandsService);
    expect(service).toBeTruthy();
  });
});
