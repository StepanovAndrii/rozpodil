import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  constructor() { }

  public generateRandomBytes(length: number): Uint8Array {
    const emptyBytesArray: Uint8Array = new Uint8Array(length);
    return crypto.getRandomValues(emptyBytesArray);
  }

  public convertBytesToBase64(bytesArray: Uint8Array): string {
    return btoa(
      String.fromCharCode(...bytesArray)
    );
  }

  public convertBase64ToString(base64String: string): string {
    return atob(
      base64String
    );
  }

  public convertBase64ToBase64Url(base64String: string): string {
    return base64String
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  public convertBase64UrlToBase64(base64UrlString: string): string {
    const padding: string = '='.repeat((4 - base64UrlString.length % 4) % 4);

    return base64UrlString
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      + padding;
  }

  public async convertToSha256Async(input: string): Promise<string> {
    const data: Uint8Array = this.convertStringToBytes(input);
    const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray: Uint8Array = new Uint8Array(hashBuffer);
    const base64String: string = this.convertBytesToBase64(hashArray);
    const base64Url: string = this.convertBase64ToBase64Url(base64String);
    return base64Url;
  }

  public convertStringToBytes(input: string): Uint8Array {
    const encoder: TextEncoder = new TextEncoder();
    return encoder.encode(input);
  }
}
