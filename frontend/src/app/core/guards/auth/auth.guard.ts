import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);
  const http: HttpClient = inject(HttpClient);

  const token = tokenService.getAccessToken();
    return http.get('/api/token/validate-access-token').pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
};
