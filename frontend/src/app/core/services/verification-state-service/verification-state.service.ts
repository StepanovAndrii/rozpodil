import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VerificationStateService {
  private email: string | null = null;

  public setEmail(email: string) {
    this.email = email;
  }

  public getEmail() {
    return this.email;
  }

  public clearEmail() {
    this.email = null;
  }
}
