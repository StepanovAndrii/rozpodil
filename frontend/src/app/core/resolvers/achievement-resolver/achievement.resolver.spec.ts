import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { achievementResolver } from './achievement.resolver';

describe('achievementResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => achievementResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
