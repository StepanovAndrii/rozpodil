import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthProviders } from '../../../../types/oauth-providers/oauth-providers';
import { PkceService } from '../pkce-service/pkce.service';
import { StorageService } from '../../../storage-service/storage.service';
import { environment } from '../../../../../../environments/environment.development';
import { StateService } from '../state-service/state.service';
import { firstValueFrom } from 'rxjs';
import { FrontendDiscoveryDocument } from '../../../../types/interfaces/discovery-document.interface';
import { UrlService } from '../../../url-service/url.service';
import { isPlatformBrowser } from '@angular/common';
import { AccessToken } from '../../../../types/models/access-token';

@Injectable({
  providedIn: 'root'
})

export class OAuthService {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _pkceService: PkceService,
    private _stateService: StateService,
    private _urlService: UrlService,
    private _http: HttpClient
  ) { }

  public async authenticateWithGoogleAsync(provider: OAuthProviders): Promise<void> {
    const discoveryDocument = await this.fetchDiscoveryDocumentAsync(provider);
    
    const codeVerifier = this.createAndStoreCodeVerifier();
    const codeChallenge = await this.createCodeChallengeAsync(codeVerifier);
    
    const state = this.createAndStoreState();

    const params = this.createAuthorizationCodeParams(
      this.getProviderClientId(provider),
      state,
      codeChallenge
    );
    
    if (!discoveryDocument?.authorization_endpoint) {
      throw new Error('Кінцева точка авторизації недоступна');
    }

    if (isPlatformBrowser(this._platformId)) {
      window.location.replace(`${discoveryDocument.authorization_endpoint}${params}`);
    }
  }

  public async sendAuthorizationCodeAsync (actualState: string, code: string): Promise<AccessToken> {
    const expectedState: string | null = sessionStorage.getItem('state');
    if (!expectedState) {
      throw new Error('Стан не був збережений');
    }

    if(!this.areStatesEqual(actualState, expectedState)) {
      throw new Error(`Невідповідність state`);
    }

    return await this.sendCodeToServerAsync(code)
      .then((accessToken: AccessToken) => {
        sessionStorage.removeItem('codeVerifier');
        sessionStorage.removeItem('state');
        return accessToken;
      });
  }

  private async sendCodeToServerAsync(code: string): Promise<AccessToken> {
    const codeVerifier: string | null = sessionStorage.getItem('codeVerifier');
    if (!codeVerifier) {
      throw new Error('Код підтвердження не збережений');
    }
    return await firstValueFrom(
      this._http.post<AccessToken>(
        `${this._urlService.getApiUrl()}/auth/google`,
        {
          code,
          code_verifier: codeVerifier
        }
      )
    );
  }

  private areStatesEqual(actualState: string, expectedState: string): boolean {
    if (actualState == expectedState)
      return true;
    
    return false;
  }

  private async fetchDiscoveryDocumentAsync(provider: OAuthProviders): Promise<FrontendDiscoveryDocument> {
    const discoveryUrl = this.getDiscoveryDocumentUrl(provider);
    try {
      return await firstValueFrom(
        this._http.get<FrontendDiscoveryDocument>(discoveryUrl)
      );
    }
    catch {
      throw new Error('Не вдалося завантажити discovery документ');
    }
  }

  private getProviderBaseUrl(provider: OAuthProviders): string {
    return environment.OAUTH_PROVIDERS[provider]?.url;
  }

  private getProviderClientId(provider: OAuthProviders): string {
    return environment.OAUTH_PROVIDERS[provider]?.clientId;
  }

  private getDiscoveryDocumentUrl(provider: OAuthProviders): string{
    return `${this.getProviderBaseUrl(provider)}/.well-known/openid-configuration`;
  }

  private createAndStoreCodeVerifier(): string {
    const codeVerifier: string = this._pkceService.generateCodeVerifier();
    sessionStorage.setItem('codeVerifier', codeVerifier);
    return codeVerifier;
  }

  private async createCodeChallengeAsync(codeVerifier: string): Promise<string> {
    return await this._pkceService.generateCodeChallengeAsync(codeVerifier);
  }

  private createAndStoreState(): string {
    const state: string = this._stateService.generateState();
    sessionStorage.setItem('state', state);
    return state;
  }

  private createAuthorizationCodeParams(
      clientId: string,
      state: string,
      codeChallenge: string
    ): string {

    return this._urlService.getQueryString({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: `${this._urlService.getOriginUrl()}/callback`,
      scope: 'openid profile email',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });
  }
}
