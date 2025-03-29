import { Component, OnDestroy } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { passwordMatchValidator } from '../../../core/validators/password-match.validator';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})

export class RegisterPageComponent implements OnDestroy{
  public registerForm: FormGroup;
  public passwordIsVisible: boolean = false;
  public passwordRepetitionIsVisible: boolean = false;
  private subscription!: Subscription;

  public constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ["", [
        Validators.required,
        Validators.email  
      ]],
      password: ["", [
        Validators.minLength(8),
        Validators.required
      ]],
      passwordRepetition: ["",
        Validators.required
      ]
    },
    {
      validators: [
        passwordMatchValidator('password', 'passwordRepetition'),
      ]
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public togglePasswordVisibility() {
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  public togglePasswordRepetitionVisibility() {
    this.passwordRepetitionIsVisible = !this.passwordRepetitionIsVisible;
  }
  
  public onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.subscription = this.http.post("http://localhost:5292/api/authentication/form-registration", formData).subscribe({
        next: () => {
          this.router.navigate(["/authentication/login"]);
        }
      });
    }
  }
}
