import { Component, EventEmitter, Output } from '@angular/core';
import { OAuthService } from '../../services/authentication/oauth/oauth-service/oauth.service';
import { OAuthProviders } from '../../types/oauth-providers/oauth-providers';

@Component({
  selector: 'app-google-auth-action-button',
  imports: [],
  templateUrl: './google-auth-action-button.component.html',
  styleUrl: './google-auth-action-button.component.scss'
})

export class GoogleAuthActionButtonComponent {
  constructor (
    private _oauthService: OAuthService,
  ) { }

  public async authenticateWithGoogleAsync() {
    await this._oauthService.authenticateWithGoogleAsync(OAuthProviders.GOOGLE);
  }
}
