import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { inject } from '@angular/core';
import { StorageService } from '../../services/storage-service/storage.service';
import { switchMap, tap } from 'rxjs';
import { SKIP_TOKEN_CHECK } from '../http-context-tokens';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const stringStorage = inject(StorageService<string>);

  if (req.url.includes('/api/token')) {
    return next(req);
  }

  // TODO: в production - налаштувати
  // let modifiedReq = req.clone({
  //   withCredentials: true
  // });

  const skipInterceptor = req.context.get(SKIP_TOKEN_CHECK);
  if (skipInterceptor) {
    return next(req); // modified?
  }

  const accessToken = stringStorage.getItem<string>("token");
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(req);
  }

  return tokenService.refreshToken().pipe(
    switchMap(token => {
      stringStorage.setItem("token", token.accessToken);
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });

      return next(authReq);
    })
  );
};
