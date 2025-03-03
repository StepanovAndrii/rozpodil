import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { AuthProvider } from '../../services/authentication/enums/auth-providers.enum';
import { environment } from '../../../environments/environment.development'

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService: AuthService = inject(AuthService);

  public loginWithGoogle() {
    this.loginWithProvider(AuthProvider.Google, environment.OAUTH_PROVIDERS.GOOGLE.clientId);
  }

  // TODO: Додати параметр clientId
  public loginWithFacebook() {
    this.loginWithProvider(AuthProvider.Facebook, "");
  }

  private loginWithProvider(provider: AuthProvider, clientId: string) {
    this._authService.configure(provider, clientId);
    this._authService.init();
  }
}
