import {TestBed} from '@angular/core/testing';

import {EndpointCategoriesService} from './endpoint-categories.service';

describe('EndpointCategoriesService', () => {
  let service: EndpointCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
