import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

export class RegistrationComponent {
  public registerWithGoogleUrl: string = "";
  public loginUrl: string = "/login";

  public registrationForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordRepetition: new FormControl('')
  });
  
  public constructor(
    private router: Router
  ) { }

  public changeToLogin() {
    this.router.navigate(
      ['/login'],
      { replaceUrl: true }
    );
  }
}
