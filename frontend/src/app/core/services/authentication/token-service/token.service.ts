import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map, of, firstValueFrom, tap, defaultIfEmpty, switchMap, exhaustMap, shareReplay, Subject, take, ReplaySubject } from 'rxjs';
import { StorageService } from '../../storage-service/storage.service';
import { CryptoService } from '../../crypto-service/crypto.service';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private refreshTokenInProgress = false;
  private refreshDone$ = new ReplaySubject<string | null>(1);


  constructor(
    private _http: HttpClient,
    private _stringStorage: StorageService<string>,
    private _cryptoService: CryptoService,
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

  public getValidAccessToken(): Observable<string | null> {
    const token = this.getAccessToken();
    console.log('[TokenService] Поточний токен:', token);
  
    if (token && this.isTokenExpired(token)) {
      console.log('[TokenService] Токен дійсний');
      return of(token);
    }
  
    if (this.refreshTokenInProgress) {
      console.log('[TokenService] Оновлення вже виконується, чекаємо');
      return this.refreshDone$.pipe(
        tap(t => console.log('[TokenService] Отримано з refreshDone$', t)),
        take(1)
      );
    }
  
    console.log('[TokenService] Токен недійсний, починаємо оновлення');
    this.refreshTokenInProgress = true;
  
    return this.refreshToken().pipe(
      tap(token => {
        console.log('[TokenService] Отримали новий токен з бекенду:', token);
        this.setAccessToken(token);
        this.refreshTokenInProgress = false;
        this.refreshDone$.next(token);
      }),
      catchError(err => {
        console.error('[TokenService] Помилка під час оновлення токена:', err);
        this.refreshTokenInProgress = false;
        this.logout();
        this.refreshDone$.next(null);
        return of(null);
      })
    );
  }
  

  public isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    if (!this.isValidJwtFormat(token)) return true;
  
    try {
      const [, payload] = token.split('.');
      const { exp } = JSON.parse(this._cryptoService.convertBase64UrlToBase64(payload));
      return Date.now() / 1000 > exp;
    } catch {
      return true;
    }
  }  

  private refreshToken(): Observable<string> {
    return this._http.post<{accessToken: string }> (
      '/api/token/refresh', {}
    ).pipe(
      map(result => result.accessToken)
    )
  }

  private isValidJwtFormat(token: string): boolean {
    return typeof token === 'string' && token.split(".").length === 3;
  }

  public deleteRefreshToken(): Observable<void> {
    return this._http.delete<void>("/api/token/delete-refresh");
  }

  public isLoggedIn(): boolean {
    return !!this.getAccessToken()
    && !this.isTokenExpired(this.getAccessToken());
  }

  public logout() {
    this.deleteAccessToken();
    this.deleteRefreshToken();
  }
}
