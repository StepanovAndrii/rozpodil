import { Injectable } from '@angular/core';
import { CryptoService } from '../cryptoService/crypto.service';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  constructor(
    private _cryptoService: CryptoService
  ) { }

  // Generates a random state value and stores it in Base64 URL format.
  public generateState(length: number = 32): string {
    const randomBytesArray: Uint8Array<ArrayBufferLike> = this._cryptoService.generateRandomBytes(length);
    const base64Code: string = this._cryptoService.bytesToBase64(randomBytesArray);
    const state = this._cryptoService.base64ToBase64Url(base64Code);
    sessionStorage.setItem('state', state);
    return sessionStorage.getItem('state')!;
  }
  
  // Validates if the received state matches the generated state.
  public validateState(receivedState: string): boolean {
    this.ensureStateGenerated();
    return receivedState === sessionStorage.getItem('state');
  }

  // Ensures the state has been generated before proceeding.
  private ensureStateGenerated() {
    if (!sessionStorage.getItem('state')) {
      throw new Error("State wasn't generated.");
    }
  }
}
