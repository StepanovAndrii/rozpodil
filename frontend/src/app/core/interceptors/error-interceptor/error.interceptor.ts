import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { inject } from '@angular/core';
import { catchError, from, switchMap, tap, throwError } from 'rxjs';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { SKIP_AUTH_REFRESH } from '../http-context-tokens';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const tokenService: TokenService = inject(TokenService);

  const skipRefresh = req.context.get(SKIP_AUTH_REFRESH);

  return next(req).pipe(
    catchError((error) => {
      const isRefreshOrLogout = req.url.includes('/token/refresh') || req.url.includes('/auth/logout');

      if (error instanceof HttpErrorResponse
        && error.status === 401
        && (isRefreshOrLogout || skipRefresh)) {

        return from(authService.logoutAsync())
          .pipe(
            switchMap(() => throwError(() => error))
          );
      }

      return tokenService.refreshToken().pipe(
        tap((accessToken) => tokenService.setAccessToken(accessToken)),
        switchMap(() => {
          const newRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenService.getAccessToken()}`,
            },
          });

          return next(newRequest);
        }),
        catchError((refreshError) => {
          return from(authService.logoutAsync()).pipe(
            switchMap(() => throwError(() => refreshError))
          );
        })
      );
    })
  );
};
