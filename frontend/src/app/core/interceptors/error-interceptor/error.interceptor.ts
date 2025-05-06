import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { TokenService } from '../../services/authentication/token-service/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService: TokenService = inject(TokenService);

  return next(req).pipe(
    catchError ((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (req.url.endsWith("validate-access-token"))
          return next(req);

        tokenService.getValidAccessToken().pipe(
          switchMap((token) => {
            if (token && !tokenService.isTokenExpired(token)) {
              return next(req);
            }
            else {
              router.navigate(['/login']);
              return throwError(() => error);
            }
          })
        );
      }

      return throwError(() => error);
    })
  );
};
