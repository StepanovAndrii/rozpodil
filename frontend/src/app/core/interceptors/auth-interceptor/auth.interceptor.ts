import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/authentication/token-service/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService: TokenService = inject(TokenService);

  // if(tokenService.getAccessToken())
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${tokenService.getAccessToken()}}`
  //     }
  //   });

  return next(req);
};
