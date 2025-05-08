import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { catchError, Observable, switchMap, of, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { Router } from '@angular/router';
import { SKIP_AUTH } from '../../http-context/skip-auth-context';

let isRefreshing = false;
let refreshSubject = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(TokenService);
  const router = inject(Router);
  const excludedPaths = ['/.well-known/openid-configuration'];

  if (excludedPaths.some(path => req.url.includes(path)))
    return next(req);

  skipAuthCheck(req, next);

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

function skipAuthCheck (req: HttpRequest<any>, next: HttpHandlerFn) {
  if (req.context.get(SKIP_AUTH))
    return next(req);

  return null;
}

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
          const accessToken = tokenService.getAccessToken();
          console.log('Access token after refresh: ', accessToken);
          if (!accessToken) {
            console.error('No access token after refresh');
          }
          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            },
            context: req.context.set(SKIP_AUTH, true)
          });
          return next(clonedRequest);
        }),
        catchError((err) => {
          isRefreshing = false;
          refreshSubject.next(false);
          tokenService.revokeToken();
          router.navigateByUrl('/login');
          console.error('Token refresh error: ', err);
          return throwError(() => new Error("Authentication Error: Redirected"));
        })
      );
      
    } else {
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
