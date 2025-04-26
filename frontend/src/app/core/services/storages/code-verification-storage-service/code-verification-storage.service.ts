import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})

export class CodeVerificationStorageService extends StorageService<string> {
  public setCodeVerification(codeVerification: string): void {
    this.setValue(codeVerification);
  }

  public getCodeVerification(): string | null {
    return this.getValue();
  }

  public clearCodeVerification(): void {
    this.clearValue();
  }
}
