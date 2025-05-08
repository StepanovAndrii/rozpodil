import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);
  const token = tokenService.getAccessToken();
  if (token && !tokenService.isTokenExpired(token))
    return true;

  return router.createUrlTree(['/login']);
};
