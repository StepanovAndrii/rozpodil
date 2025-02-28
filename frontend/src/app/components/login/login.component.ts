import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService: AuthService = inject(AuthService);

  public loginWithGoogle(){
    this._authService.loginWithProvider(
      "https://accounts.google.com",
      "936348575223-3tfersreot1291v3o4acu2j3klvag4ho.apps.googleusercontent.com"
    );
  }
}
