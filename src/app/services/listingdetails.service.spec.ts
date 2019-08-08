import { TestBed } from '@angular/core/testing';

import { ListingdetailsService } from './listingdetails.service';

describe('ListingdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListingdetailsService = TestBed.get(ListingdetailsService);
    expect(service).toBeTruthy();
  });
});
