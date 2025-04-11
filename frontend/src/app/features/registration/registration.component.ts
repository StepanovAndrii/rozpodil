import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { PasswordFieldComponent } from "../../core/components/password-field/password-field.component";

@Component({
  selector: 'app-registration',
  imports: [
    RouterLink,
    InputFieldComponent,
    PasswordFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnInit{
  public registerWithGoogleUrl: string = "";
  public loginUrl: string = "/login";
  
  public registrationForm!: FormGroup;

  public constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = this.formBuilder.group ({
      username: [''],
      email: [''],
      password: [''],
      passwordRepetition: ['']
    });
  }

  public changeToLogin() {
    this.router.navigate(
      ['/login'],
      { replaceUrl: true }
    );
  }
}
