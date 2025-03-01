import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-callback-page',
  imports: [],
  templateUrl: './callback-page.component.html',
  styleUrl: './callback-page.component.scss'
})
export class CallbackPageComponent implements OnInit, OnDestroy{
  private _authService: AuthService = inject(AuthService);
  
  public ngOnInit(): void {
    const code: string | null = this._authService.catchCode();

    if(code) {
      this._authService.sendCodeToBackend(code);
    }
  }

  public ngOnDestroy(): void {
    this._authService.unsubscribe();
  }
}
