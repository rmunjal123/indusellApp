import { TestBed } from '@angular/core/testing';

import { CreatelistingService } from './createlisting.service';

describe('CreatelistingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatelistingService = TestBed.get(CreatelistingService);
    expect(service).toBeTruthy();
  });
});
