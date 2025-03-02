import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HeaderTypes } from './header-types.enum';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(
    private _http: HttpClient
  ) { }

  // Sends the access code to the backend via POST request
  public sendAccessCodeToBackend$(code: string, format: HeaderTypes): Observable<any> {
    const accessCodeApiUrl: string = `${environment.apiUrl}/api/auth/access-code`;

    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', format);

    const body: Record<string, string> = {
      code
    };
    const finalBody = this.encodeBody(body, format);

    return this._http.post<any>(accessCodeApiUrl, finalBody, { headers });
  }

  // Encodes body based on the format
  private encodeBody(body: Record<string, string>, format: HeaderTypes) {
    switch(format) {
      case HeaderTypes.ApplicationJson:
        return body;
      case HeaderTypes.FormFormat:
        return new URLSearchParams(body).toString();
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }
}
