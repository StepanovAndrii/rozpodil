import { Component } from '@angular/core';
import { OAuthService } from '../../../../core/services/authentication/oauthService/oauth.service';
import { AuthProviders } from '../../../../core/models/auth-providers.enum';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss'
})
export class LoginButtonComponent {
  constructor(
    private _oauthService: OAuthService
  ) { }

  loginWithGoogle() {
    this._oauthService.loginWithProvider(AuthProviders.GOOGLE, environment.OAUTH_PROVIDERS.GOOGLE.clientId);
  }
}
