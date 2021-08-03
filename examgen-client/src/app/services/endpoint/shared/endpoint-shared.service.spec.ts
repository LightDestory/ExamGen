import {TestBed} from '@angular/core/testing';

import {EndpointSharedService} from './endpoint-shared.service';

describe('EndpointSharedService', () => {
  let service: EndpointSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
