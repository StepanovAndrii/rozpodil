import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from "./core/components/toast-container/toast-container.component";
import { AuthService } from './core/services/authentication/auth-service/auth.service';
import { TokenService } from './core/services/authentication/token-service/token.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  // constructor(
  //   private _tokenService: TokenService
  // ) { }

  // async ngOnInit(): Promise<void> {
  //   console.log("я в огн ініт")
  //   if(!await this._tokenService.validateAccessToken())
  //     await firstValueFrom (
  //       this._tokenService.getValidAccessToken()
  //     );
      
  // }
}
