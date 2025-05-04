import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);

  return true;
};