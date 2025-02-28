import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})

export class AuthConfigService {
  private _document: Document = inject(DOCUMENT);

  public constructor() { }

  public getAuthConfig(issuer: string, clientId: string) {
    return {
      clientId: clientId,
      redirectUri: this._document.location.origin + '/auth/callback',
      scope: 'openid email profile',
      oidc: true,
      requestAccessToken: false,
      issuer: issuer,
      clearHashAfterLogin: true,
      responseType: 'code',
      strictDiscoveryDocumentValidation: false
    } as AuthConfig;
  }
}
