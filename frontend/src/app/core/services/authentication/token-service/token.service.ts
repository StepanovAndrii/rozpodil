import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, shareReplay, EMPTY, ArgumentOutOfRangeError } from 'rxjs';
import { AccessToken } from '../../../types/interfaces/access-token';
import { Router } from '@angular/router';
import { StorageService } from '../../storage-service/storage.service';
import { AccessTokenArray } from './models/access-token-array';
import { CryptoService } from '../../crypto-service/crypto.service';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private apiUrl = '/api/token/refresh';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _stringStorage: StorageService<string>,
    private _cryptoService: CryptoService
  ) {}

  // TODO: доробити обробку помилок
  public refreshToken(): Observable<AccessToken> {
    return this._http.post<AccessToken>(this.apiUrl, {}).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            this._router.navigate(['/login']);
            return throwError(() => {});
          }
          return throwError(() => {});
        }
        return throwError(() => {});
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  public isAccessTokenValidLocally(): boolean {
    const accessToken: string | null = this._stringStorage.getItem<string>('token');

    if (!accessToken)
      return false;

    const splitToken = accessToken.split(".");

    if (splitToken.length !== 3)
      return false;

    var decodedAccessToken: AccessTokenArray = accessToken.split(".") as AccessTokenArray;

    let json;
    try {
      json = this.decodeJwtPart(decodedAccessToken, 2);
    }
    catch {
      return false;
    }

    json.
  }

  private decodeJwtPart(jwt: AccessTokenArray, position: number): any {
    if (position < 0 && position >= jwt.length)
      throw new RangeError("Індекс знаходиться поза межами масиву");

    const base64 = this._cryptoService.convertBase64UrlToBase64(jwt[position]);
    const json = this._cryptoService.convertBase64ToString(base64);
    return JSON.parse(json);
  }
}
