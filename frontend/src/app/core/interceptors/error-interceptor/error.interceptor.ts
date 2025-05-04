import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { inject } from '@angular/core';
import { TokenService } from '../../services/authentication/token-service/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const tokenService: TokenService = inject(TokenService);

  console.log("я хоча б тут")

  return next(req)
  
}