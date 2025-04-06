import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleEyeComponent } from "../../core/components/toggle-eye/toggle-eye.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, ToggleEyeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  public forgotPasswordUrl: string = "";
  public loginWithGoogleUrl: string = "";
  public registerUrl: string = "/register";

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('eyeButton') togglePasswordButton!: ElementRef<HTMLButtonElement>;

  public isPasswordInvisible: boolean = true;

  public constructor(
    
  ) { }

  public preventShortcut(event: KeyboardEvent): void {
    if((event.ctrlKey) || event.metaKey && ['c', 'x'].includes(event.key.toLowerCase())) {
      event.preventDefault();
    }
  }
}
