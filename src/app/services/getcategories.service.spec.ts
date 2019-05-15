import { TestBed } from '@angular/core/testing';

import { GetcategoriesService } from './getcategories.service';

describe('GetcategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetcategoriesService = TestBed.get(GetcategoriesService);
    expect(service).toBeTruthy();
  });
});
