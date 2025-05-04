import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { TokenService } from '../services/authentication/token-service/token.service';

export const authMatchGuard: CanMatchFn = async (route, segments) => {
  const tokenService = inject(TokenService);

  if(await tokenService.hasValidAccessToken()) {
    console.log("тут можна");
     return true;
  }

  return true
};
