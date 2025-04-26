import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { UrlService } from '../../core/services/url-service/url.service';
import { OAuthService } from '../../core/services/authentication/oauth/oauth-service/oauth.service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})

export class CallbackComponent implements OnInit{
  constructor (
    private route: ActivatedRoute,
    private _oauthService: OAuthService
  ) { }

  public async ngOnInit(): Promise<void> {
    const actualState: string | null = this.route.snapshot.queryParamMap.get('state');
    const code: string | null = this.route.snapshot.queryParamMap.get('code');

    if (!actualState) {
      throw new Error('Параметр "state" не знайдений у запиті.');
    }

    if (!code) {
      throw new Error('Параметр "code" не знайдений у запиті.');
    }

    this._oauthService.sendAuthorizationCodeAsync(actualState, code);
  }
}
