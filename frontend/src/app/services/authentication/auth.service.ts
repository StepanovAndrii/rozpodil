import { inject, Injectable } from '@angular/core';
import { AuthConfigService } from './auth-config/auth-config.service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authService: OAuthService = inject(OAuthService);
  private _configuration: AuthConfigService = inject(AuthConfigService);
  private _http: HttpClient = inject(HttpClient);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _routeSubscriptions: Subscription[] = [];
  
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

  public catchCode(): string | null {
    this._routeSubscriptions.push( 
      this._route.queryParamMap.subscribe(params => {
        const code = params.get('code');

        if(code) {
          return code;
        }

        return null;
      })
    );

    return null;
  }

  public unsubscribe() {
    this._routeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public sendCodeToBackend(code: string): void {
    this._routeSubscriptions.push(
      this._http.post('http://localhost:3000/api/auth', {code})
        .subscribe({
          next: (response: any) => {
            
          },
          error: (error: any) => {

          }
      })
    );
  } 
}