import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { TokenService } from '../../services/authentication/token-service/token.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
  finalize
} from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);


// TODO: вивчити
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {

        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return tokenService.refreshToken().pipe(
            switchMap((newAccessTokenModel) => {
              tokenService.setAccessToken(newAccessTokenModel);
              refreshTokenSubject.next(newAccessTokenModel);

              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessTokenModel}`
                }
              });

              return next(newRequest);
            }),
            catchError((refreshError) => {
              if(refreshError instanceof HttpErrorResponse && error.status === 401) {
                authService.logoutAsync();
              }
              return throwError(() => refreshError);
            }),
            finalize(() => {
              isRefreshing = false;
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => {
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next(newRequest);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
