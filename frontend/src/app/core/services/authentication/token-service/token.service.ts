import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map, of, firstValueFrom, tap, defaultIfEmpty } from 'rxjs';
import { AccessToken } from '../../../types/interfaces/access-token';
import { StorageService } from '../../storage-service/storage.service';

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

  public refreshToken(): Observable<void> {
    return this._http.post<AccessToken>("/api/token/refresh", {})
      .pipe(
        map((accessTokenResponse) => accessTokenResponse.accessToken),
        tap((accessToken) => this.setAccessToken(accessToken)),
        map(() => void 0),
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
