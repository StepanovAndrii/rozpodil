import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  AbstractControl,
  FormControl
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  firstValueFrom,
  Subject,
  takeUntil
} from 'rxjs';

import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { PasswordFieldComponent } from "../../core/components/password-field/password-field.component";
import { CheckmarkComponent } from "../../core/components/checkmark/checkmark.component";
import { passwordNamedValidators } from './validators/password-named-validators';
import { createEmailNamedValidators } from './validators/email-named-validators';
import { usernameNamedValidators } from './validators/username-named-validators';
import { passwordRepetitionNamedValidators } from './validators/password-repetition-named-validators';
import { getValidatorsPair } from '../../core/validators/utils/validator-type-guards';
import { FieldHintsPopoverComponent } from "../../core/components/field-hints-popover/field-hints-popover.component";
import { AuthService } from '../../core/services/authentication/auth-service/auth.service';
import { GoogleAuthActionButtonComponent } from "../../core/components/google-auth-action-button/google-auth-action-button.component";
import { HttpClient } from '@angular/common/http';
import { CombinedValidator } from '../../core/validators/named-combined-validator';
import { ToastFactory } from '../../core/services/toast-service/factories/toast-factory';
import { ToastType } from '../../core/services/toast-service/models/toast-types';
import { ToastService } from '../../core/services/toast-service/toast.service';

@Component({
  selector: 'app-registration',
  imports: [
    RouterLink,
    InputFieldComponent,
    PasswordFieldComponent,
    ReactiveFormsModule,
    CheckmarkComponent,
    FieldHintsPopoverComponent,
    GoogleAuthActionButtonComponent
],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

// TODO: подумати над фабріками, може зробити усім валідаторам

export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('username') usernameField: InputFieldComponent | undefined;
  @ViewChild('email') emailField: InputFieldComponent | undefined;
  @ViewChild('password') passwordField: PasswordFieldComponent | undefined;
  @ViewChild('passwordRepetition') passwordRepetitionField: PasswordFieldComponent | undefined;

  public focusedDefault = signal(false);
  public registerWithGoogleUrl: string = "";
  public loginUrl: string = "/login";
  public registrationForm!: FormGroup;
  public usernameNamedValidators = usernameNamedValidators;
  public emailNamedValidators!: CombinedValidator[];
  public passwordNamedValidators = passwordNamedValidators;
  public get passwordRepetitionNamedValidators() {
    const passwordControl = this.getControl('password');
    return passwordRepetitionNamedValidators(passwordControl!);
  }

  private destroy$ = new Subject<void>();

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _http: HttpClient,
    private _toastService: ToastService
  ) { }
  
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.emailNamedValidators = createEmailNamedValidators(this._http);
    this.initForm();
  }

  public getControl(name: string): AbstractControl<any, any> | null {
    return this.registrationForm.get(name);
  }

  public async registerWithFormAsync(): Promise<void> {
    if(this.registrationForm.invalid) {
      this._toastService.show(ToastType.Error, "Введені дані некоректні. Перевірте форму.");
      return;
    }

    const { passwordRepetition, ...dataToSend } = this.registrationForm.value;
    await this._authService.registerWithFormAsync(dataToSend)
    const email = this.registrationForm.get('email')!.value;
    sessionStorage.setItem('email', email);
    this.router.navigate(['verify-email']);
  }
  
  public changeToLogin() {
    this.router.navigate(
      ['/login'],
      { replaceUrl: true }
    );
  }

  private initForm() {
    const [usernameSync, usernameAsync] = getValidatorsPair(usernameNamedValidators);
    const [passwordSync, passwordAsync] = getValidatorsPair(passwordNamedValidators);
    const [emailSync, emailAsync] = getValidatorsPair(
      createEmailNamedValidators(this._http)
    );

    this.registrationForm = this.formBuilder.group({
      username: new FormControl<string>(
        '',
        {
          validators: usernameSync,
          asyncValidators: usernameAsync,
          updateOn: 'change',
          nonNullable: true
        }
      ),
      email: ['', emailSync, emailAsync],
      password: ['', passwordSync, passwordAsync],
      passwordRepetition: ['']
    });

    this.setPasswordMismatchValidator();
  }

  private setPasswordMismatchValidator(): void {
    const passwordControl = this.getControl('password');
    const passwordRepetitionControl = this.getControl('passwordRepetition');

    if (passwordControl && passwordRepetitionControl) {
      const [passwordRepetitionSync, passwordRepetitionAsync] = getValidatorsPair(
        this.passwordRepetitionNamedValidators
      );

      passwordRepetitionControl.setValidators(
        passwordRepetitionSync
      );

      passwordRepetitionControl.setAsyncValidators(
        passwordRepetitionAsync
      );

      passwordControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          passwordRepetitionControl.updateValueAndValidity();
        })
    }
  }
}
