import { Component } from '@angular/core';
import { OAuthService } from '../../../core/services/authentication/oauthService/oauth.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-login-callback-page',
  imports: [],
  templateUrl: './login-callback-page.component.html',
  styleUrl: './login-callback-page.component.scss'
})

export class LoginCallbackPageComponent {
  constructor(
    private _oauthService: OAuthService
  ) {
    this._oauthService.handleAuthorizationCode().then((code) => {
      this._oauthService.sendAccessCodeToBackend(environment.API_URL, code);
    });
  }
}
