import { Inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthProvider } from './enums/auth-providers.enum';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private _authService: OAuthService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  // Налаштовує конфігурацію авторизації для вказаного провайдера
  private configure(provider: AuthProvider, clientId: string): void {
    const configuration: AuthConfig = {
      clientId,
      redirectUri: this._document.location.origin + '/auth/callback',
      scope: 'email profile',
      oidc: false,
      issuer: this.getIssuerLink(provider),
      clearHashAfterLogin: true,
      responseType: 'code',
      strictDiscoveryDocumentValidation: false
    };

    this._authService.configure(configuration);
    this._authService.loadDiscoveryDocument();
  }

  // Повертає URL для issuer відповідно до обраного провайдера авторизації
  private getIssuerLink(provider: AuthProvider): string {
    switch (provider) {
      case AuthProvider.Google:
        return 'https://accounts.google.com';
      case AuthProvider.Facebook:
        return 'https://www.facebook.com/v11.0/dialog/oauth';
      default:
        throw new Error("Провайдер не був знайдений");
    }
  }

  // Ініціює процес авторизації через обраного провайдера
  public loginWithProvider(provider: AuthProvider, clientId: string): void {
    this.configure(provider, clientId);
    this._authService.initCodeFlow();
  }

  // Повертає авторизаційний код з параметрів URL як Observable<string | null>
  public getAuthorizationCode$(): Observable<string | null> {
    return this._route.queryParamMap.pipe(
      // Трансформує ParamMap в значення параметра 'code'
      map(parameters => parameters.get('code'))
    );
  }

  // Відправляє access code на бекенд через POST-запит
  public sendAccessCodeToBackend(code: string): void {
    const accessCodeApiUrl : string = environment.apiUrl + '/api/auth/token';

    this._http.post(accessCodeApiUrl , {code});
  }
}