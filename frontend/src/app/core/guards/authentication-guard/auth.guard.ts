import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../../services/tokenStorageService/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);

  const token = tokenStorageService.getToken();
  if(token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
