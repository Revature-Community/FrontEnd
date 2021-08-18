import { TestBed } from '@angular/core/testing';

import { DeletepostService } from './deletepost.service';

describe('DeletepostService', () => {
  let service: DeletepostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletepostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
