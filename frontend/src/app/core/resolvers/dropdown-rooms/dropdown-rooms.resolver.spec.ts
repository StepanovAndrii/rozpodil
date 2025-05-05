import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dropdownRoomsResolver } from './dropdown-rooms.resolver';

describe('dropdownRoomsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => dropdownRoomsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
