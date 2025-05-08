import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { switchMap } from 'rxjs';

// TODO: обов'язково таки розібратись
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService: TokenService = inject(TokenService);

  return tokenService.getValidAccessToken().pipe(
    switchMap(token => {
      const clone = token
        ? req.clone({setHeaders: { Authorization: `Bearer ${token}` }})
        : req;
      return next(clone);
    })
  );
};
