import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { AuthService } from '../../core/services/auth-service/auth.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { requiredValidator } from '../../core/validators/built-in-validators/required.validator';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ResendCodeButtonComponent } from "../../core/components/resend-code-button/resend-code-button.component";

@Component({
  selector: 'app-verification-code',
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    ResendCodeButtonComponent
],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.scss'
})

export class VerificationCodeComponent implements OnInit, OnDestroy {
  public verifyCodeForm!: FormGroup;
  
  private destroy$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public verify() {
    if(this.verifyCodeForm.valid) {
      const codeControl: AbstractControl<any, any> | null = this.verifyCodeForm.get('code');

      if(codeControl) {
        const code: string = codeControl.value;
        this._authService.verifyCode(code)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (result: any) => {
              this._router.navigate(['room']);
            },
            error: (error: any) => {

            }
          });
      } 
    }
  }

  private initForm() {
    this.verifyCodeForm = this._formBuilder.group({
      code: ['', requiredValidator.fn]
    });
  }
}
