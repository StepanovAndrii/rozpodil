import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { UrlService } from '../../url-service/url.service';
import { AccessToken } from '../../../types/interfaces/access-token';
import { TokenService } from '../token-service/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _router: Router
   ) { }
  
  // TODO: замінити мб дженерик на щось більш конкретне (створити модель)
  public async loginWithFormAsync<T extends Record<string, string>>(dataToSend: T): Promise<AccessToken> {
    return await firstValueFrom (
      this._http.get<AccessToken>(
        'api/auth/login',
        { 
          params: dataToSend
        }
      )
    );
  }

  public async registerWithFormAsync<T extends Record<string, unknown>>(dataToSend: T): Promise<void> {
    await firstValueFrom (
      this._http.post(
        '/api/auth/register',
        dataToSend
      )
    );
  }

  public async verifyCodeAsync(code: string): Promise<AccessToken> {
    return await firstValueFrom(
      this._http.post(
        '/api/auth/verify-code',
        { code }
      )
    ) as AccessToken;
  }

  public async resendCodeAsync(email: string): Promise<Object> {
    return await firstValueFrom(
      this._http.post(
        '/api/auth/resend-email',
        { email }
      )
    );
  }

  public async logoutAsync(): Promise<void> {
    this._tokenService.deleteAccessToken();
    await this._http.post("/api/auth/logout", {});
    this._router.navigate(['/login']);
  }
}
