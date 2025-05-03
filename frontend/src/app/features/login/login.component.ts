import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { PasswordFieldComponent } from "../../core/components/password-field/password-field.component";
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { GoogleAuthActionButtonComponent } from "../../core/components/google-auth-action-button/google-auth-action-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth-service/auth.service';

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

  public forgotPasswordUrl: string = "";
  public loginWithGoogleUrl: string = "";
  public registerUrl: string = "/register";
  public loginForm!: FormGroup; 
  public isPasswordInvisible: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this._formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  public loginWithForm() {
    
  }
}
