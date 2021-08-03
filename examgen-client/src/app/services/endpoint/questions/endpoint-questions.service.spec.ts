import {TestBed} from '@angular/core/testing';

import {EndpointQuestionsService} from './endpoint-questions.service';

describe('EndpointQuestionsService', () => {
  let service: EndpointQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
