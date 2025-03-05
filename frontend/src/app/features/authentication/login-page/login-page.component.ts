import { Component } from '@angular/core';
import { LoginButtonComponent } from "./login-button/login-button.component";

@Component({
  selector: 'app-login-page',
  imports: [LoginButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
