import { TestBed } from '@angular/core/testing';

import { SellerdetailsService } from './sellerdetails.service';

describe('SellerdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerdetailsService = TestBed.get(SellerdetailsService);
    expect(service).toBeTruthy();
  });
});
