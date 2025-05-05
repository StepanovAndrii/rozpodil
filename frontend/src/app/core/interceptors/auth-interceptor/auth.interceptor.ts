import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
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
  finalize,
  Observable
} from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

// TODO: обов'язково таки розібратись
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  const accessToken = tokenService.getAccessToken();
  
  if (accessToken) {
    if (tokenService.checkIfTokenIsExpired(accessToken)) {
      return handleTokenRefresh(req, next, tokenService, authService);
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => handleHttpError(req, next, error, tokenService, authService))
  );
};

function handleTokenRefresh(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  authService: AuthService
): Observable<HttpEvent<any>> {
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
      if (refreshError instanceof HttpErrorResponse && refreshError.status === 401) {
        authService.logoutAsync();
      }
      return throwError(() => refreshError);
    }),
    finalize(() => {
      isRefreshing = false;
    })
  );
}

function handleHttpError(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  error: any,
  tokenService: TokenService,
  authService: AuthService
): Observable<HttpEvent<any>> {
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
          if (refreshError instanceof HttpErrorResponse && refreshError.status === 401) {
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
}
