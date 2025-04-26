import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})

export class EmailStorageService extends StorageService<string> {
  public setEmail(email: string): void {
    this.setValue(email);
  }

  public getEmail(): string | null {
    return this.getValue();
  }

  public clearEmail(): void {
    this.clearValue();
  }
}
