import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [RouterLink],
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
