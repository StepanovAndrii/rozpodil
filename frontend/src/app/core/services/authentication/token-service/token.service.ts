import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map, of, firstValueFrom, tap, defaultIfEmpty, switchMap, exhaustMap, shareReplay } from 'rxjs';
import { AccessToken } from '../../../types/interfaces/access-token';
import { StorageService } from '../../storage-service/storage.service';
import { CryptoService } from '../../crypto-service/crypto.service';
import { AccessTokenPayload } from '../../../types/interfaces/access-token-payload';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  constructor(
    private _http: HttpClient,
    private _stringStorage: StorageService<string>,
    private _cryptoService: CryptoService
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
    return this._http.post<AccessToken>("/api/token/refresh", {}).pipe(
      exhaustMap((accessTokenResponse) => {
        const accessToken = accessTokenResponse.accessToken;
        this.setAccessToken(accessToken);
        return [accessToken];
      }),
      shareReplay(1),
      catchError((error) => throwError(() => error))
    );
  }

  public checkIfTokenIsExpired(token: string): boolean {
    if (!this.isValidJwtFormat) {
      return true;
    }
    const tokenPayloadBase64UrlFormat = token.split(".")[1];
    const base64FormatTokenPayload = this._cryptoService.convertBase64UrlToBase64(tokenPayloadBase64UrlFormat);
    const stringFormatTokenPayload = this._cryptoService.convertBase64ToString(base64FormatTokenPayload);
    const accessTokenPayload = JSON.parse(stringFormatTokenPayload) as AccessTokenPayload;

    return accessTokenPayload.exp < Math.floor(Date.now() / 1000);
  }

  private isValidJwtFormat(token: string): boolean {
    return typeof token === 'string' && token.split(".").length === 3;
  }
}
