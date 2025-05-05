import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import { RouterLink, Router } from '@angular/router';
import { PasswordFieldComponent } from "../../core/components/password-field/password-field.component";
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { GoogleAuthActionButtonComponent } from "../../core/components/google-auth-action-button/google-auth-action-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth-service/auth.service';
import { ToastService } from '../../core/services/toast-service/toast.service';
import { ToastType } from '../../core/services/toast-service/models/toast-types';
import { getValidatorsPair } from '../../core/validators/utils/validator-type-guards';
import { emailNamedValidators } from './validators/email-named-validators';
import { passwordNamedValidators } from './validators/password-named-valodators';
import { StorageService } from '../../core/services/storage-service/storage.service';
import { TokenService } from '../../core/services/authentication/token-service/token.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    PasswordFieldComponent,
    InputFieldComponent,
    GoogleAuthActionButtonComponent,
    ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('eyeButton') togglePasswordButton!: ElementRef<HTMLButtonElement>;

  public forgotPasswordUrl: string = "/reset-password";
  public registerUrl: string = "/register";
  public loginForm!: FormGroup; 
  public isPasswordInvisible: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastService: ToastService,
    private _tokenservice: TokenService,
    private _router: Router
  ) { }
  
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    const [emailSync, emailAsync] = getValidatorsPair(emailNamedValidators);
    const [passwordSync, passwordAsync] = getValidatorsPair(passwordNamedValidators);

    this.loginForm = this._formBuilder.group({
      email: ['', emailSync, emailAsync],
      password: ['', passwordSync, passwordAsync]
    });
  }

  public async loginWithForm(): Promise<void> {
    if (this.loginForm.invalid) {
      this._toastService.show(ToastType.Error, "Введені дані некоректні. Перевірте форму.");
      return;
    }

    var accessToken = await this._authService.loginWithFormAsync(this.loginForm.value);
    this._tokenservice.setAccessToken(accessToken.accessToken);
    this._router.navigate(["/room"]);
  }
}
