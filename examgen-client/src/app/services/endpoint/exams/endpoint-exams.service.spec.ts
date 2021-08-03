import {TestBed} from '@angular/core/testing';

import {EndpointExamsService} from './endpoint-exams.service';

describe('EndpointExamsService', () => {
  let service: EndpointExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
