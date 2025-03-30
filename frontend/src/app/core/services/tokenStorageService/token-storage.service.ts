import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private accessToken: string | null = null;

  public saveToken(token: string): void {
    this.accessToken = token;
  }

  public getToken(): string | null {
    return this.accessToken;
  }

  public clearToken(): void {
    this.accessToken = null;
  }
}
