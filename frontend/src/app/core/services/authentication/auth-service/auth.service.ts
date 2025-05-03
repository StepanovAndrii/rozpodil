import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { UrlService } from '../../url-service/url.service';
import { AccessToken } from '../../../types/interfaces/access-token';
import { SKIP_TOKEN_CHECK } from '../../../interceptors/http-context-tokens';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _context = new HttpContext().set(SKIP_TOKEN_CHECK, true)

  constructor(
    private _http: HttpClient,
    private _urlService: UrlService
   ) { }
  
  public async registerWithFormAsync<T extends Record<string, any>>(dataToSend: T): Promise<void> {
    await firstValueFrom (
      this._http.post(
        '/api/auth/register',
        dataToSend,
        { context: this._context }
      )
    );
  }

  public async verifyCodeAsync(code: string): Promise<AccessToken> {
    return await firstValueFrom(
      this._http.post(
        '/api/auth/verify-code',
        { code }, 
        { context: this._context }
      )
    ) as AccessToken;
  }

  public async resendCodeAsync(email: string): Promise<Object> {
    return await firstValueFrom(
      this._http.post(
        '/api/auth/resend-email',
        { email },
        { context: this._context }
      )
    );
  }
}
