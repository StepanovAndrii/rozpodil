import { Component } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { AuthProvider } from '../../services/authentication/enums/auth-providers.enum';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-callback-page',
  imports: [],
  templateUrl: './callback-page.component.html',
  styleUrl: './callback-page.component.scss'
})

export class CallbackPageComponent {
  constructor (
    private _authService: AuthService,
  ) {
    this._authService.configure(AuthProvider.Google, environment.OAUTH_PROVIDERS.GOOGLE.clientId);
    this._authService.login();
    console.log(this._authService.getToken());
  }
}