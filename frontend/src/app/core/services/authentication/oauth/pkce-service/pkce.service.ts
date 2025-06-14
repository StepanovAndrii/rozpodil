import { Injectable } from '@angular/core';
import { CryptoService } from '../../../crypto-service/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class PkceService {
  constructor(
    private _cryptoService: CryptoService
  ) { }

  public generateCodeVerifier(length: number = 128): string {
    const randomBytesArray: Uint8Array = this._cryptoService.generateRandomBytes(length);
    return this._cryptoService.convertBytesToBase64(randomBytesArray);
  }

  public async generateCodeChallengeAsync(codeVerifier: string): Promise<string> {
    return await this._cryptoService.convertToSha256Async(codeVerifier);
  }
}
