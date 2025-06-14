import { TestBed } from '@angular/core/testing';

import { DateAdapterService } from './date-adapter.service';

describe('DateAdapterService', () => {
  let service: DateAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
