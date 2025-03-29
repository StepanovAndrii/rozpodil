import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [
        Validators.required,
        Validators.email  
      ]],
      password: ["", [
        Validators.minLength(8),
        Validators.required
      ]]
    })
  }

  public onSubmit() {
    this.http.post("http://localhost/api/authentication/email-verification", this.loginForm);
  }
}
