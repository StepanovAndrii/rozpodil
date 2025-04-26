import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthProviders } from '../../../../types/oauth-providers/oauth-providers';
import { PkceService } from '../pkce-service/pkce.service';
import { CodeVerificationStorageService } from '../../../storages/code-verification-storage-service/code-verification-storage.service';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class OauthService { 
  constructor(
    private _pkceService: PkceService,
    private _codeVerificationStorage: CodeVerificationStorageService,
    private _http: HttpClient
  ) { }

  public async registerWithProviderAsync(providers: OAuthProviders) {
    const codeVerifier: string = this._pkceService.generateCodeVerifier();
    this._codeVerificationStorage.setCodeVerification(codeVerifier);

    const codeChallenge: string = await this._pkceService.generateCodeChallengeAsync(codeVerifier);
    // state
    
    // зібрати urlsearchparams
    // прейти по цьому
  }

  private getProviderBaseUrl(provider: OAuthProviders): string {
    return environment.OAUTH_PROVIDERS[provider]?.url;
  }
}
// .well-known/openid-configuration