import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { roomResolverResolver } from './room-resolver.resolver';

describe('roomResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => roomResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
