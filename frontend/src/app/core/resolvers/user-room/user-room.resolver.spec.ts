import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userRoomResolver } from './user-room.resolver';
import { IRoom } from '../../types/interfaces/room-interface';

describe('userRoomResolver', () => {
  const executeResolver: ResolveFn<IRoom | null> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userRoomResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
