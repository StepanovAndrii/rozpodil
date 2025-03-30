import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

let navigatedFromApp = false;

export const setNavigatedFromApp = (value: boolean) => {
  navigatedFromApp = value;
};

export const navigationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if(!navigatedFromApp) {
    router.navigate(['/']);
    return false;
  }

  navigatedFromApp = false;
  return true;
};
