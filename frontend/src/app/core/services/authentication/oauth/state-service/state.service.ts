import { Injectable } from '@angular/core';
import { CryptoService } from '../../../crypto-service/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private _cryptoService: CryptoService
  ) { }

  public generateState(length: number = 32): string {
    const bytesArray: Uint8Array = this._cryptoService.generateRandomBytes(length);
    const base64String: string = this._cryptoService.convertBytesToBase64(bytesArray);
    const base64UrlString: string = this._cryptoService.convertBase64ToBase64Url(base64String);
    return base64UrlString;
  }
}
