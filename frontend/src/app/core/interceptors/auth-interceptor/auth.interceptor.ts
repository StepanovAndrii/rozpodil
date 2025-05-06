import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { switchMap } from 'rxjs';

// TODO: обов'язково таки розібратись
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService: TokenService = inject(TokenService);

  if (req.url.includes('/api/token/refresh')
    || req.url.includes('/api/token/delete-refresh')
    || req.url.includes('.well-known/openid-configuration')
    || req.url.includes('/api/auth/oauth')) {
    return next(req);
  }

  return tokenService.getValidAccessToken().pipe(
    switchMap(token => {
      const clone = token
        ? req.clone({setHeaders: { Authorization: `Bearer ${token}` }})
        : req;
      return next(clone);
    })
  );
};
