import { inject, Injectable } from '@angular/core';
import { AuthConfigService } from './auth-config/auth-config.service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authService: OAuthService = inject(OAuthService);
  private _configuration: AuthConfigService = inject(AuthConfigService);
  
  constructor() { }

  public loginWithProvider(issuer: string, clientId: string): void {
    const googleAuthConfig: AuthConfig = this._configuration.getAuthConfig(
      issuer,
      clientId
    );

    this._authService.configure(googleAuthConfig);
    this._authService.loadDiscoveryDocument();
    this._authService.initCodeFlow();
  }
}