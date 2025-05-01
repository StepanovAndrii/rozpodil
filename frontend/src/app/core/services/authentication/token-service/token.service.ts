import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, shareReplay, EMPTY } from 'rxjs';
import { AccessToken } from '../../../types/interfaces/access-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private apiUrl = '/api/token/refresh';

  constructor(
    private _http: HttpClient,
    private _router: Router
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
      shareReplay({ bufferSize: 1, refCount: true }) // Щоб уникнути дублювання запитів
    );
  }
}
