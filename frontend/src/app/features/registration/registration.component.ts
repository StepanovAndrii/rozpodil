import {
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { PasswordFieldComponent } from "../../core/components/password-field/password-field.component";
import { lowercaseValidator } from '../../core/validators/lowercase.validator';
import { uppercaseValidator } from '../../core/validators/uppercase.validator';
import { noWhitespaceValidator } from '../../core/validators/no-whitespace.validator';
import { oneDigitValidator } from '../../core/validators/one-digit.validator';
import { specialSymbolValidator } from '../../core/validators/one-special-symbol.validator';
import { passwordMismatchValidator } from '../../core/validators/password-mismatch.validator';

@Component({
  selector: 'app-registration',
  imports: [
    RouterLink,
    InputFieldComponent,
    PasswordFieldComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit, AfterViewInit{
  public registerWithGoogleUrl: string = "";
  public loginUrl: string = "/login";
  
  public registrationForm!: FormGroup;

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public ngAfterViewInit(): void {
    this.runAnimeAnimation();
  }

  public changeToLogin() {
    this.router.navigate(
      ['/login'],
      { replaceUrl: true }
    );
  }

  private setPasswordMismatchValidator(): void {
    const passwordControl = this.registrationForm.get('password');
    const passwordRepetitionControl = this.registrationForm.get('passwordRepetition');

    if (passwordControl && passwordRepetitionControl) {
      passwordRepetitionControl.setValidators([
        passwordMismatchValidator(passwordControl)
      ]);
    }
  }

  private initForm() {
    this.registrationForm = this.formBuilder.group ({
      username: ['', [
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ]],
      email: ['', [
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.required,
        lowercaseValidator(),
        uppercaseValidator(),
        noWhitespaceValidator(),
        oneDigitValidator(),
        specialSymbolValidator()
      ]],
      passwordRepetition: ['', [
        Validators.required
      ]]
    });

    this.setPasswordMismatchValidator();
  }

  private runAnimeAnimation(): void {
    
  }
}
