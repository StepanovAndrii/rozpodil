import {
  Component,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { AuthService } from '../../core/services/authentication/auth-service/auth.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';
import { ResendCodeButtonComponent } from "../../core/components/resend-code-button/resend-code-button.component";
import { getValidatorsPair } from '../../core/validators/utils/validator-type-guards';
import { verificationCodeValidators } from './validators/verification-code-validators';
import { FieldHintsPopoverComponent } from "../../core/components/field-hints-popover/field-hints-popover.component";

@Component({
  selector: 'app-verification-code',
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    ResendCodeButtonComponent,
    FieldHintsPopoverComponent
],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.scss'
})

export class VerificationCodeComponent implements OnInit {
  @ViewChild('verificationCode') verificationCodeField: InputFieldComponent | undefined;

  public focusedDefault = signal(false);
  public verifyCodeForm!: FormGroup;
  public verificationCodeValidators = verificationCodeValidators;

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

  // TODO: можливо якось винести метод звідси, register і тд..
  public getControl(name: string): AbstractControl<any, any> | null {
    return this.verifyCodeForm.get(name);
  }

  private initForm() {
   const [verificationCodeSync, verificationCodeAsync] = getValidatorsPair(verificationCodeValidators)

    this.verifyCodeForm = this._formBuilder.group({
      code: ['', verificationCodeSync, verificationCodeAsync]
    });
  }
}
