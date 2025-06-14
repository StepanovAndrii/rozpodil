import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { roomTasksResolver } from './room-tasks.resolver';

describe('roomTasksResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => roomTasksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
