import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { catchError, Observable, switchMap, of, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { Router } from '@angular/router';

let isRefreshing = false;
let refreshSubject = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(TokenService);
  const router = inject(Router);
  
  const accessToken = service.getAccessToken();
  const clonedRequest = accessToken 
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    : req;

  return next(clonedRequest).pipe(
    catchError(error => handleAuthError(error, service, router, clonedRequest, next))
  );
};


function handleAuthError(
  error: HttpErrorResponse,
  tokenService: TokenService,
  router: Router,
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> {
  if (error.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshSubject.next(false);

      return tokenService.refreshToken().pipe(
        switchMap(() => {
          isRefreshing = false;
          refreshSubject.next(true);
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenService.getAccessToken()}`
            }
          });
          return next(clonedRequest);
        }),
        catchError(() => {
          isRefreshing = false;
          refreshSubject.next(false);
          tokenService.revokeToken();
          router.navigateByUrl('/');
          return throwError(() => new Error("Authentication Error: Redirected"));
        })
      );
    } else {
      // Чекаємо, поки токен буде оновлено
      return refreshSubject.pipe(
        filter(isRefreshed => isRefreshed),
        take(1),
        switchMap(() => {
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenService.getAccessToken()}`
            }
          });
          return next(clonedRequest);
        })
      );
    }
  }

  return throwError(() => error);
}
