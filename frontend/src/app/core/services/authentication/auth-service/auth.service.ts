import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { UrlService } from '../../url-service/url.service';
import { AccessToken } from '../../../types/interfaces/access-token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private _http: HttpClient,
    private _urlService: UrlService
   ) { }
  
  public async registerWithFormAsync<T extends Record<string, any>>(dataToSend: T): Promise<void> {
    await firstValueFrom (
      this._http.post('/api/auth/register', dataToSend)
    );
  }

  public async verifyCodeAsync(code: string): Promise<AccessToken> {
    return await firstValueFrom(
      this._http.post(
        '/api/auth/verify-code',
        { code }, 
        { withCredentials: true }
      )
    ) as AccessToken;
  }

  public async resendCodeAsync(email: string): Promise<Object> {
    return await firstValueFrom(
      this._http.post('/api/auth/resend-email', { email })
    );
  }
}
