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
  public generateCodeVerifier(length: number = 128): void {
    const randomBytesArray: Uint8Array<ArrayBufferLike> = this._cryptoService.generateRandomBytes(length);
    const base64Code: string = this._cryptoService.bytesToBase64(randomBytesArray);
    const base64CodeUrl: string = this._cryptoService.base64ToBase64Url(base64Code);
    sessionStorage.setItem('code_verifier', base64CodeUrl);
  }

  // Asynchronous method for generating a code_challenge from a provided code_verifier.
  public async generateCodeChallenge(): Promise<string> {
    this.ensureCodeVerifierGenerated();
    const base64CodeVerifier = this._cryptoService.base64UrlToBase64(this.codeVerifier!);
    const bytesArray: Uint8Array<ArrayBufferLike> = this._cryptoService.base64ToBytes(base64CodeVerifier);
    const hashArray = await this._cryptoService.hashBytesWithSHA256(bytesArray);
    const base64Code = this._cryptoService.bytesToBase64(hashArray);
    return this._cryptoService.base64ToBase64Url(base64Code);
  }

  // Ensures the code verifier has been generated before proceeding.
  public ensureCodeVerifierGenerated() {
    if(!sessionStorage.getItem('code_verifier')) {
      throw new Error("Code verifier wasn't generated.");
    }
  }
}
