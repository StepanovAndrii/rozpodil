import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private _http: HttpClient
   ) { }
  
  public registerWithForm<T extends Record<string, any>>(dataToSend: T): Observable<Object> {
    return this._http.post('https://localhost:7297/api/auth/register', dataToSend);
  }

  public verifyCode(code: string): Observable<Object> {
    return this._http.post('https://localhost:7297/api/auth/verify-code', { code }, {
      withCredentials: true
    })
  }

  public resendCode(email: string): Observable<Object> {
    return this._http.post('https://localhost:7297/api/auth/resend-email', { email });
  }
}
