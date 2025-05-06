import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);

  return tokenService.getValidAccessToken().pipe(
    map(token => {
      return token ? true : router.parseUrl('/login');
    })
  );
};
