import {
  Component,
  OnInit
} from '@angular/core';

import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { AuthService } from '../../core/services/authentication/auth-service/auth.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { requiredValidator } from '../../core/validators/built-in-validators/required.validator';
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

export class VerificationCodeComponent implements OnInit {
  public verifyCodeForm!: FormGroup;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public async verifyAsync() {
    if(this.verifyCodeForm.valid) {
      const codeControl: AbstractControl<any, any> | null = this.verifyCodeForm.get('code');

      if(codeControl) {
        const code: string = codeControl.value;
        await this._authService.verifyCodeAsync(code)
        this._router.navigate(['room']);
      } 
    }
  }

  private initForm() {
    this.verifyCodeForm = this._formBuilder.group({
      code: ['', requiredValidator.fn]
    });
  }
}
