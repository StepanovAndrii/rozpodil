import { TestBed } from '@angular/core/testing';

import { CodeVerificationStorageService } from './code-verification-storage.service';

describe('CodeVerificationStorageService', () => {
  let service: CodeVerificationStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeVerificationStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
