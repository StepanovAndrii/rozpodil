import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, throwError, map, of, firstValueFrom, tap, defaultIfEmpty, switchMap, exhaustMap, shareReplay, Subject, take, ReplaySubject } from 'rxjs';
import { CryptoService } from '../../crypto-service/crypto.service';
import { AuthService } from '../auth-service/auth.service';
import { JwtPayload } from './models/jwt-payload';
import { UUID } from 'crypto';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private refreshTokenInProgress = false;
  private refreshDone$ = new Subject<string | null>;


  constructor(
    private _http: HttpClient,
    private _cryptoService: CryptoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public getAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }

    return null;
  }

  public setAccessToken(accessToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', accessToken);
    }
  }

  public deleteAccessToken() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
    }
  }

  public getValidAccessToken(): Observable<string | null> {
    const token = this.getAccessToken();
  
    if (token && !this.isTokenExpired(token)) {
      return of(token);
    }
  
    if (this.refreshTokenInProgress) {
      return this.refreshDone$.pipe(
        take(1)
      );
    }
  
    this.refreshTokenInProgress = true;
  
    return this.refreshToken().pipe(
      tap(token => {
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
  
  public getUserId(): string | null{
    const token = this.getAccessToken();
    if (!token)
      return null;

    const jwtPayload = this.getTokenPayload(token);

    return jwtPayload?.sub ?? null;
  }

  public isTokenExpired(token: string | null): boolean {
    if (!token) return true;
  
    const tokenPayload = this.getTokenPayload(token);

    if (tokenPayload) {
      const { exp } = tokenPayload;

      return Date.now() / 1000 > exp;
    }
    
    return true;
  }  

  public refreshToken(): Observable<string> {
    return this._http.post<{accessToken: string }> (
      '/api/token/refresh', {}
    ).pipe(
      map(result => result.accessToken),
      tap((result) => {
        this.setAccessToken(result);
      }),
      shareReplay(1)
    );
  }

  public async validateAccessToken(): Promise<boolean> {
    const token = this.getAccessToken();
    if (token) {
      try {
        await firstValueFrom(
          this._http.get("/api/token/validate-access-token")
        );
        return true;
      }
      catch (error) {
        return false;
      }
    }

    return false;
  }

  private getTokenPayload(token: string): JwtPayload | null {
    if (!this.isValidJwtFormat(token)) return null;
    try {
      const [, payload] = token.split('.');

      const base64: string = this._cryptoService.convertBase64UrlToBase64(payload);
      const parsedPayload = JSON.parse(
        this._cryptoService.convertBase64ToString(base64)
      );

      if (this.isJwtPayload(parsedPayload))
        return parsedPayload

      return null;
    }
    catch (error) {
      return null;
    }
  }

  private isJwtPayload(obj: any): obj is JwtPayload {
    return obj && typeof obj === 'object';
  }

  private isValidJwtFormat(token: string): boolean {
    return typeof token === 'string' && token.split(".").length === 3;
  }

  public revokeToken(): Observable<void> {
    return this._http.delete<void>("/api/token/delete-refresh");
  }

  public isLoggedIn(): boolean {
    return !!this.getAccessToken()
    && !this.isTokenExpired(this.getAccessToken());
  }

  public logout() {
    this.deleteAccessToken();
    this.revokeToken();
  }
}
