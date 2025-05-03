import { HttpClient, HttpContext } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthProviders } from '../../../../types/oauth-providers/oauth-providers';
import { PkceService } from '../pkce-service/pkce.service';
import { environment } from '../../../../../../environments/environment.development';
import { StateService } from '../state-service/state.service';
import { firstValueFrom, map } from 'rxjs';
import { FrontendDiscoveryDocument } from '../../../../types/interfaces/discovery-document.interface';
import { UrlService } from '../../../url-service/url.service';
import { isPlatformBrowser } from '@angular/common';
import { AccessToken } from '../../../../types/interfaces/access-token';
import { State } from '../../../../types/interfaces/state';
import { StorageService } from '../../../storage-service/storage.service';
import { SKIP_TOKEN_CHECK } from '../../../../interceptors/http-context-tokens';

@Injectable({
  providedIn: 'root'
})

export class OAuthService {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _pkceService: PkceService,
    private _storage: StorageService<string>,
    private _stateService: StateService,
    private _urlService: UrlService,
    private _http: HttpClient
  ) { }

  public async authenticateWithGoogleAsync(provider: OAuthProviders): Promise<void> {
    const discoveryDocument = await this.fetchDiscoveryDocumentAsync(provider);
    
    const codeVerifier = this.createAndStoreCodeVerifier();
    const codeChallenge = await this.createCodeChallengeAsync(codeVerifier);

    const state = this.createAndStoreState(provider);

    const params = this.createAuthorizationCodeParams(
      this.getProviderClientId(provider),
      state,
      codeChallenge
    );
    
    if (!discoveryDocument?.authorizationEndpoint) {
      throw new Error('Кінцева точка авторизації недоступна');
    }

    if (isPlatformBrowser(this._platformId)) {
      window.location.assign(`${discoveryDocument.authorizationEndpoint}${params}`);
    }
  }

  public async sendAuthorizationCodeAsync (actualState: string, code: string): Promise<void> {
    const expectedState: string | null = sessionStorage.getItem('state');
    
    if (!expectedState) {
      throw new Error('Стан не був збережений');
    }

    if(!this.areStatesEqual(actualState, expectedState)) {
      throw new Error(`Невідповідність state`);
    }

    const codeVerifier: string | null = sessionStorage.getItem('codeVerifier');

    if (!codeVerifier) {
      throw new Error('Код підтвердження не збережений');
    }

    const provider = this.getProvider(actualState);

    const accessToken: AccessToken = await this.sendCodeToServerAsync(
      provider,
      code,
      codeVerifier
    );
    
    sessionStorage.removeItem('codeVerifier');
    sessionStorage.removeItem('state');

    this._storage.setItem(
      "token",
      accessToken.accessToken
    );
  }

  private async sendCodeToServerAsync(
      provider: string,
      code: string,
      codeVerifier: string
    ): Promise<AccessToken>
  {
    const context = new HttpContext().set(SKIP_TOKEN_CHECK, true)

    return await firstValueFrom(
      this._http.post<AccessToken>(
        '/api/auth/oauth',
        {
          provider,
          code,
          codeVerifier
        },
        { context }
      )
    );
  }

  private areStatesEqual(actualState: string, expectedState: string): boolean {
      return actualState == expectedState;
  }

  private async fetchDiscoveryDocumentAsync(provider: OAuthProviders): Promise<FrontendDiscoveryDocument> {
    const discoveryUrl = this.getDiscoveryDocumentUrl(provider);
    const context = new HttpContext().set(SKIP_TOKEN_CHECK, true)
    try {
      return await firstValueFrom(
        this._http.get<FrontendDiscoveryDocument>(discoveryUrl, {
          context
        })
      );
    }
    catch {
      throw new Error('Не вдалося завантажити discovery документ');
    }
  }

  private getProvider(stateString: string): string {
    const state: State = this._stateService.deserializeState(stateString);
    return state.provider;
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

  private createAndStoreState(provider: OAuthProviders): string {
    const state: string = this._stateService.generateState(provider);
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
