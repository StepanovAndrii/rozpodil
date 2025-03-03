import { Inject, Injectable } from '@angular/core';
import { AuthProvider } from './enums/auth-providers.enum';
import { DOCUMENT } from '@angular/common';
import { AuthConfig, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private _oauthService: OAuthService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  // Configures the authorization configuration for the specified provider
  public configure(provider: AuthProvider, clientId: string): void {
    const configuration: AuthConfig = {
      clientId,
      // TODO
      dummyClientSecret: '',
      redirectUri: this._document.location.origin + '/auth/callback',
      scope: "email profile",
      oidc: true,
      issuer: 'https://accounts.google.com',
      clearHashAfterLogin: true,
      responseType: "code",
      requireHttps: false,
      strictDiscoveryDocumentValidation: false,
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo'
    };

    this._oauthService.configure(configuration);
    this._oauthService.loadDiscoveryDocument();
  }

  // Returns the URL for the issuer according to the selected authorization provider
  private getIssuerLink(provider: AuthProvider): string {
    switch (provider) {
      case AuthProvider.Google:
        return environment.OAUTH_PROVIDERS.GOOGLE.link;
      case AuthProvider.Facebook:
        return environment.OAUTH_PROVIDERS.FACEBOOK.link;
      default:
        throw new Error("Provider not found");
    }
  }

  public login() {
    this._oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // Initiates the authorization process through the selected provider
  public init(): void {
    this._oauthService.initCodeFlow();
  }

  public getToken(){
    return this._oauthService.getIdToken();
  }
}