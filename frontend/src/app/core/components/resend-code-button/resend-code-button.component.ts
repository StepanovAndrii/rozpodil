import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { interval, map, takeWhile } from 'rxjs';
import { AuthService } from '../../services/authentication/auth-service/auth.service';
import { StorageService } from '../../services/storage-service/storage.service';

@Component({
  selector: 'app-resend-code-button',
  imports: [],
  templateUrl: './resend-code-button.component.html',
  styleUrl: './resend-code-button.component.scss'
})
export class ResendCodeButtonComponent {
  private readonly cooldownSeconds = 60;
  private readonly storageKey = 'resend_timer_started_at';
  private isBrowser: boolean;

  public secondsLeft = signal(0);
  public isCooldownActive = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _authService: AuthService,
    private _stringStorage: StorageService<string>
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const saved = sessionStorage.getItem(this.storageKey);
    if (saved) {
      const elapsed = Math.floor((Date.now() - +saved) / 1000);
      const left = this.cooldownSeconds - elapsed;
        if (left > 0) {
          this.startCountdown(left);
        } else {
          this.clearStorage();
        }
      }
    }
  }

  public resendCode() {
    sessionStorage.setItem(this.storageKey, Date.now().toString());
    this.startCountdown(this.cooldownSeconds);
    
    const userEmail = this._stringStorage.getItem<string>('email');
    if(userEmail != null) {
      this._authService.resendCodeAsync(userEmail)
    }
    //TODO: зробити винятки
  }

  private startCountdown(from: number) {
    this.secondsLeft.set(from);
    this.isCooldownActive.set(true);

    interval(1000)
    .pipe(
      takeWhile(() => this.secondsLeft() > 0),
      map(() => this.secondsLeft() - 1)
    )
    .subscribe(value => {
      this.secondsLeft.set(value);
      if (value === 0) {
        this.isCooldownActive.set(false);
        this.clearStorage();
      }
    });
  }

  private clearStorage() {
    sessionStorage.removeItem(this.storageKey);
  }
}
