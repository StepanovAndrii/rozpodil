import { ResolveFn } from '@angular/router';

export const roomResolverResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
