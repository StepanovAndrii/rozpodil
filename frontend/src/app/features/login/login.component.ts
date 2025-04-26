import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { PasswordFieldComponent } from "../../core/components/password-field/password-field.component";
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { GoogleAuthActionButtonComponent } from "../../core/components/google-auth-action-button/google-auth-action-button.component";

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    PasswordFieldComponent,
    InputFieldComponent,
    GoogleAuthActionButtonComponent
],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  public forgotPasswordUrl: string = "";
  public loginWithGoogleUrl: string = "";
  public registerUrl: string = "/register";

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('eyeButton') togglePasswordButton!: ElementRef<HTMLButtonElement>;

  public isPasswordInvisible: boolean = true;
}
