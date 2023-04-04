import { TestBed } from '@angular/core/testing';

import { BasicReadingService } from './basic-reading.service';

describe('BasicReadingService', () => {
  let service: BasicReadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicReadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
