import {TestBed} from '@angular/core/testing';

import {EndpointAuthService} from './endpoint-auth.service';

describe('EndpointAuthService', () => {
  let service: EndpointAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
