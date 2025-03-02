import { Inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthProvider } from './auth-providers.enum';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private _authService: OAuthService,
    private _route: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  // Configures the authorization configuration for the specified provider
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

  // Returns the URL for the issuer according to the selected authorization provider
  private getIssuerLink(provider: AuthProvider): string {
    switch (provider) {
      case AuthProvider.Google:
        return 'https://accounts.google.com';
      case AuthProvider.Facebook:
        return 'https://www.facebook.com/v11.0/dialog/oauth';
      default:
        throw new Error("Provider not found");
    }
  }

  // Initiates the authorization process through the selected provider
  public loginWithProvider(provider: AuthProvider, clientId: string): void {
    this.configure(provider, clientId);
    this._authService.initCodeFlow();
  }

  // Returns the authorization code from the URL parameters as an Observable<string | null>
  public getAuthorizationCode$(): Observable<string | null> {
    return this._route.queryParamMap.pipe(
      // Transforms ParamMap into the value of the 'code' parameter
      map(parameters => parameters.get('code'))
    );
  }
}