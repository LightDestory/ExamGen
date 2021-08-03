import {TestBed} from '@angular/core/testing';

import {EndpointSubjectsService} from './endpoint-subjects.service';

describe('EndpointSubjectsService', () => {
  let service: EndpointSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
