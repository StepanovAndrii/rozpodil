import { TestBed } from '@angular/core/testing';

import { EmailStorageService } from './email-storage.service';

describe('VerificationStateService', () => {
  let service: EmailStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
