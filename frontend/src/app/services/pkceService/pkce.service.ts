import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PkceService {
  private _challengeMethod: string = "SHA-256";
  
  public get challengeMethod() : string {
    return this._challengeMethod;
  }

  // Generates a random code_verifier, which is a string in base64url format.
  public generateCodeVerifier(length: number = 128): string {
    length = Math.max(43, Math.min(128, length));
    const randomBytesArray: Uint8Array<ArrayBufferLike> = this.generateRandomBytes(length);
    const base64Code: string = this.bytesToBase64(randomBytesArray);
    return this.base64ToBase64Url(base64Code);
  }

  // Asynchronous method for generating a code_challenge from a provided code_verifier.
  public async generateCodeChallenge(codeVerifier: string) {
    const bytesArray: Uint8Array<ArrayBufferLike> = this.base64ToBytes(codeVerifier);
    const hashArray = await this.hashBytesWithSHA256(bytesArray);
    const base64Code = this.bytesToBase64(hashArray);
    return this.base64ToBase64Url(base64Code);
  }

  // Asynchronous method for hashing bytes using the SHA-256 algorithm.
  private async hashBytesWithSHA256(bytesArray: Uint8Array<ArrayBufferLike>) {
    const hashBuffer = await crypto.subtle.digest(this.challengeMethod, bytesArray);
    return new Uint8Array<ArrayBufferLike>(hashBuffer);
  }

  // Method for converting a base64 string to a byte array.
  private base64ToBytes(base64Code: string): Uint8Array<ArrayBufferLike> {
    const binaryString = atob(base64Code);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    return byteArray;
  }

  // Generates random bytes of a specific length using crypto.getRandomValues.
  private generateRandomBytes(length: number): Uint8Array<ArrayBufferLike> {
    const bytesArray: Uint8Array<ArrayBufferLike> = new Uint8Array(length);
    return crypto.getRandomValues(bytesArray);
  }

  // Converts a byte array to a base64 string.
  private bytesToBase64(bytesArray: Uint8Array<ArrayBufferLike>): string {
    return btoa(String.fromCharCode(...bytesArray));
  }

  // Converts a base64 string to base64url format (replacing characters and removing the '=' at the end).
  private base64ToBase64Url(base64Code: string): string {
    return base64Code
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
