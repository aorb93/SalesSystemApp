import { TestBed } from '@angular/core/testing';

import { ApiSubCategoryService } from './api-sub-category.service';

describe('ApiSubCategoryService', () => {
  let service: ApiSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
