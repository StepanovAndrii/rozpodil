import { Injectable } from '@angular/core';
import { PkceService } from '../pkceService/pkce.service';
import { StateService } from '../stateService/state.service';
import { AuthProviders } from '../../../models/auth-providers.enum';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OAuthService {
  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute ,
    private _pkceService: PkceService,
    private _stateService: StateService
  ) { }

  // public async loadDiscoveryDocument(discoveryDocumentApi: string) {
  //   return await firstValueFrom(
  //     this._http.get(discoveryDocumentApi)
  //   ) as DiscoveryDocument;
  // }

  // Initiates the login process with the specified OAuth provider.
  public async loginWithProvider(provider: AuthProviders, clientId: string) {
    this._pkceService.generateCodeVerifier();
    const params = new URLSearchParams({
      client_id: environment.OAUTH_PROVIDERS.GOOGLE.clientId,
      redirect_uri: "http://localhost:4200/authentication/callback",
      response_type: "code",
      scope: "openid email profile",
      state: this._stateService.generateState(),
      code_challenge: await this._pkceService.generateCodeChallenge(),
      code_challenge_method: this._pkceService.challengeMethod,
      prompt: "consent"
    });
    const authority = this.getProviderUrl(provider) + "/o/oauth2/v2/auth";
    window.location.href = this.buildUri(authority, params);
  }

  public async handleAuthorizationCode(): Promise<string> {
    const { state, code } = await firstValueFrom(this._route.queryParams);
    if(!this._stateService.validateState(state)) {
      throw new Error('Invalid state');
    }
    return code;
  }

  public async sendAccessCodeToBackend(backendUrl: string, code: string) {
    this._pkceService.ensureCodeVerifierGenerated();
    
    const body: Record<string, string> = {
      code: code,
      code_verifier: this._pkceService.codeVerifier!
    };

    this._http.post(backendUrl + "/auth/exchange-code", body, {
    }).subscribe({
      next: (response: any) => {
        
      },
      error: (error) => {
        console.log(error);
      }
    });
    // sessionStorage.clear();
  }

  // Returns the URL for the specified authentication provider.
  private getProviderUrl(provider: AuthProviders): string {
    switch(provider) {
      case AuthProviders.GOOGLE:
        return environment.OAUTH_PROVIDERS.GOOGLE.url;
    }
  }

  // Builds a complete URL from the given authority and parameters.
  private buildUri(authority: string, params: URLSearchParams = new URLSearchParams()): string {
    const url = new URL(authority);
    url.search = params.toString();
    return url.toString();
  }
}
