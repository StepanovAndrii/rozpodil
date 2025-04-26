import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { UrlService } from '../../url-service/url.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private _http: HttpClient,
    private _urlService: UrlService
   ) { }
  
  public async registerWithFormAsync<T extends Record<string, any>>(dataToSend: T): Promise<Object> {
    return await firstValueFrom (
      this._http.post(`${this._urlService.getApiUrl()}/auth/register`, dataToSend)
    );
  }

  public async verifyCodeAsync(code: string): Promise<Object> {
    return await firstValueFrom(
      this._http.post(
        `${this._urlService.getApiUrl()}/auth/verify-code`,
        { code }, 
        { withCredentials: true }
      )
    );
  }

  public async resendCodeAsync(email: string): Promise<Object> {
    return await firstValueFrom(
      this._http.post(`${this._urlService.getApiUrl()}/auth/resend-email`, { email })
    );
  }
}
