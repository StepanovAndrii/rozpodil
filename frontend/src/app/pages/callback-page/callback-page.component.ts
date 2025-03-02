import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api/api.service';
import { HeaderTypes } from '../../services/api/header-types.enum';

@Component({
  selector: 'app-callback-page',
  imports: [],
  templateUrl: './callback-page.component.html',
  styleUrl: './callback-page.component.scss'
})

export class CallbackPageComponent {
  constructor (
    private _authService: AuthService,
    private _apiService: ApiService
  ) {
    this._authService.getAuthorizationCode$()
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: (code: string | null): void => {
        if(code){
          this._apiService.sendAccessCodeToBackend$(code, HeaderTypes.FormFormat)
          .subscribe({
            
          });
        }
      }
    });
  }
}