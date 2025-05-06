import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userRoomsResolver } from './user-rooms.resolver';
import { IRoom } from '../../types/interfaces/room-interface';

describe('userRoomsResolver', () => {
  const executeResolver: ResolveFn<IRoom[] | null> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userRoomsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
