import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, ReplaySubject, firstValueFrom, take, filter, Subject, share, tap, catchError, of, defaultIfEmpty } from 'rxjs';
import { CryptoService } from '../../crypto-service/crypto.service';
import { JwtPayload } from './models/jwt-payload';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private refreshTokenInProgress = false;
  private refreshDone$ = new Subject<string | null>;


  constructor(
    private _http: HttpClient,
    private _cryptoService: CryptoService,
  ) {}

  public getAccessToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public setAccessToken(accessToken: string): void {
    sessionStorage.setItem('token', accessToken);
  }

  public deleteAccessToken() {
    sessionStorage.removeItem('token');
  }

  public async getValidAccessToken(): Promise<string | null> {
    const token = this.getAccessToken();
  
    if (token && !this.isTokenExpired(token)) {
      return token;
    }

    if (this.refreshTokenInProgress) {
      return firstValueFrom(this.refreshDone$.pipe(
        take(1)
      ));
    }

    this.refreshTokenInProgress = true;
    
    return firstValueFrom(
      this.refreshToken().pipe(
        tap((token) => {
          this.setAccessToken(token);
          this.refreshTokenInProgress = false;
          this.refreshDone$.next(token);
        }),
        catchError((error) => {
          this.refreshTokenInProgress = false;
          this.refreshDone$.next(null);
          console.log(error);
          return of(null);
        }),
        defaultIfEmpty('default value')
      )
    );

    return null;
  }
  
  
  
  public getUserId(): string | null{
    const token = this.getAccessToken();
    console.log("token: " + token);
    if (!token)
      return null;

    const jwtPayload = this.getTokenPayload(token);
    console.log("jwt: " + jwtPayload);
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

  private getTokenPayload(token: string): JwtPayload | null {
    if (!this.isValidJwtFormat(token)) return null;

    console.log("ТОкен в правильній формі")
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
    console.log("В методі isJwtPayload")
    return obj && typeof obj === 'object';
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
