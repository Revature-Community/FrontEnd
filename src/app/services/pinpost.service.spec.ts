import { TestBed } from '@angular/core/testing';

import { PinpostService } from './pinpost.service';

describe('PinpostService', () => {
  let service: PinpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
