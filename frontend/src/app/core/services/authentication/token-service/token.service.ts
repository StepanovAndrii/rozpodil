import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map, of, firstValueFrom, tap, defaultIfEmpty, switchMap } from 'rxjs';
import { AccessToken } from '../../../types/interfaces/access-token';
import { StorageService } from '../../storage-service/storage.service';
import { SKIP_AUTH_REFRESH } from '../../../interceptors/http-context-tokens';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  constructor(
    private _http: HttpClient,
    private _stringStorage: StorageService<string>,
  ) {}

  public getAccessToken(): string | null {
    return this._stringStorage.getItem<string>('token');
  }

  public setAccessToken(accessToken: string): void {
    this._stringStorage.setItem('token', accessToken);
  }

  public deleteAccessToken() {
    this._stringStorage.clearItem('token');
  }

  // TODO: подумати як залишити логіку зберігання access токену тут а не в інтерсепторі
  public refreshToken(): Observable<string> {
    return this._http.post<AccessToken>("/api/token/refresh", {}, {
      context: new HttpContext().set(SKIP_AUTH_REFRESH, true)
    }).pipe(
      map((accessTokenResponse) => accessTokenResponse.accessToken),
      tap((accessToken) => this.setAccessToken(accessToken)),
      catchError((error) => throwError(() => error))
    );
  }

  public hasValidAccessToken(): Observable<boolean> {
    if (this.getAccessToken()) {
      return of(true);
    }
  
    return this._http.get<boolean>("/api/token/validate-access-token");
  }
}
