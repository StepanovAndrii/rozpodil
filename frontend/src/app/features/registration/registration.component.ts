import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { PasswordFieldComponent } from "../../core/components/password-field/password-field.component";

@Component({
  selector: 'app-registration',
  imports: [RouterLink, InputFieldComponent, PasswordFieldComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent {
  public registerWithGoogleUrl: string = "";
  public loginUrl: string = "/login";
  
  public constructor(
    private router: Router
  ) { }

  public changeToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
