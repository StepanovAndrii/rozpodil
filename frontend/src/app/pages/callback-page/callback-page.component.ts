import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-callback-page',
  imports: [],
  templateUrl: './callback-page.component.html',
  styleUrl: './callback-page.component.scss'
})
export class CallbackPageComponent implements OnInit {
  constructor (
    private _authService: AuthService
  ) { }
  
  public ngOnInit(): void {
    this._authService.getAuthorizationCode$()
    .pipe(takeUntilDestroyed())
    .subscribe({
      next: (code: string | null): void => {
        if(code){
          this._authService.sendAccessCodeToBackend(code);
        }
      }
    });
  }
}