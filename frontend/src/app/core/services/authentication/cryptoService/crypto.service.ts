import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  // Generates random bytes of a specific length using crypto.getRandomValues.
  public generateRandomBytes(length: number): Uint8Array<ArrayBufferLike> {
    const emptyBytesArray: Uint8Array<ArrayBufferLike> = new Uint8Array(length);
    return crypto.getRandomValues(emptyBytesArray);
  }

  // Converts a byte array to a base64 string.
  public bytesToBase64(bytesArray: Uint8Array<ArrayBufferLike>): string {
    return btoa(
      String.fromCharCode(...bytesArray)
    );
  }

  // Asynchronous method for hashing bytes using the SHA-256 algorithm.
  public async hashBytesWithSHA256(bytesArray: Uint8Array<ArrayBufferLike>): Promise<Uint8Array<ArrayBufferLike>> {
    const hashBuffer: ArrayBufferLike = await crypto.subtle.digest('SHA-256', bytesArray);
    return new Uint8Array<ArrayBufferLike>(hashBuffer);
  }

  // Converts a base64 string to base64url format (replacing characters and removing the '=' at the end).
  public base64ToBase64Url(base64Code: string): string {
    return base64Code
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Converts a base64Url string to a standard base64 string.
  public base64UrlToBase64(base64UrlCode: string): string {
    return base64UrlCode
      .replace(/\-/g, '+')
      .replace(/\_/g, '/')
      .concat('='.repeat((4 - base64UrlCode.length % 4) % 4));
  }

  // Method for converting a base64 string to a byte array.
  public base64ToBytes(base64Code: string): Uint8Array<ArrayBufferLike> {
    const binaryString = atob(base64Code);
    return Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  }
}
