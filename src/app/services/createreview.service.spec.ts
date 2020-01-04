import { TestBed } from '@angular/core/testing';

import { CreatereviewService } from './createreview.service';

describe('CreatereviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatereviewService = TestBed.get(CreatereviewService);
    expect(service).toBeTruthy();
  });
});
