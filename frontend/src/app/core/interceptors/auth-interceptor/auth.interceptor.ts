import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { switchMap } from 'rxjs';

// TODO: обов'язково таки розібратись
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService: TokenService = inject(TokenService);

  var token = tokenService.getAccessToken();
  if(token)
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }));
  
  return next(req);
};
