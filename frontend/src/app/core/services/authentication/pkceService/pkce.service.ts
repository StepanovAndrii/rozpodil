import { Injectable } from '@angular/core';
import { CryptoService } from '../cryptoService/crypto.service';

@Injectable({
  providedIn: 'root'
})

export class PkceService {
  private _challengeMethod: string = "S256";
  
  public get codeVerifier(): string | null {
    return sessionStorage.getItem('code_verifier');
  }

  public get challengeMethod(): string {
    return this._challengeMethod;
  }

  constructor(
    private _cryptoService: CryptoService
  ) { }

  // Generates a random code_verifier, which is a string in base64url format.
  generateCodeVerifier(length: number = 128): void {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
    const randomValues = new Uint8Array(length);
  
    window.crypto.getRandomValues(randomValues);
  
    randomValues.forEach((value) => {
      codeVerifier += charset[value % charset.length];
    });
  
    sessionStorage.setItem('code_verifier', codeVerifier);
  }

  // Asynchronous method for generating a code_challenge from a provided code_verifier.
  async generateCodeChallenge(): Promise<string> {
    const encoder = new TextEncoder();
    const codeVerifier = sessionStorage.getItem('code_verifier');
    const data = encoder.encode(
      codeVerifier!
    );
  
    return await window.crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const base64Url = btoa(String.fromCharCode.apply(null, hashArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
  
      return base64Url;
    });
  }
  

  // Ensures the code verifier has been generated before proceeding.
  public ensureCodeVerifierGenerated() {
    if(!sessionStorage.getItem('code_verifier')) {
      throw new Error("Code verifier wasn't generated.");
    }
  }
}
