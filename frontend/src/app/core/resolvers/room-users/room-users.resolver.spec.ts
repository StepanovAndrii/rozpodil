import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { roomUsersResolver } from './room-users.resolver';

describe('roomUsersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => roomUsersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
