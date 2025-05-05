import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { catchError, map, tap } from 'rxjs';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const accessToken = tokenService.getAccessToken();

  if (accessToken && tokenService.checkIfTokenIsExpired(accessToken)) {
    return tokenService.refreshToken().pipe(
      tap((newToken) => tokenService.setAccessToken(newToken)),
      map((newToken) => !tokenService.checkIfTokenIsExpired(newToken)),
      catchError(() => {
        authService.logoutAsync();
        return of(false);
      })
    );
  }

  if (accessToken) {
    return true;
  }

  authService.logoutAsync();
  return false;
};
