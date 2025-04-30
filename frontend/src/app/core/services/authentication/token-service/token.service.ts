import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, of, shareReplay, Subject, switchMap, take, throwError } from 'rxjs';
import { AccessToken } from '../../../types/interfaces/access-token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private refreshTokenInProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private refreshTokenSubject: Subject<AccessToken | null> = new Subject<AccessToken | null>();
  private apiUrl = '/api/token';

  constructor(
    private _http: HttpClient
  ) { }

  public refreshToken(): Observable<AccessToken> {
    if (this.refreshTokenInProgress.value) {
      return this.refreshTokenSubject
        .pipe(
          filter(token => token !== null),
          take(1)
        );
    }
    
    this.refreshTokenInProgress.next(true);

    return this._http.post<AccessToken>(this.apiUrl, {})
      .pipe(
        switchMap((token) => {
          this.refreshTokenInProgress.next(false);
          this.refreshTokenSubject.next(token);
          return of(token);
        }),
        catchError(error => {
          this.refreshTokenInProgress.next(false);
          return throwError(() => error);
        }),
        shareReplay({
          bufferSize: 1,
          refCount: true
        })
      );
  }
}
