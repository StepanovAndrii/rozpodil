import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { AuthProvider } from '../../services/authentication/enums/auth-providers.enum';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService: AuthService = inject(AuthService);

  public loginWithGoogle() {
    this._authService.loginWithProvider(
      AuthProvider.Google,
      environment.clientId
    );
  }

  // TODO: Додати параметр clientId
  public loginWithFacebook() {
    this._authService.loginWithProvider(
      AuthProvider.Facebook,
      ""
    );
  }
}
