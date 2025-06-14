import { Injectable } from '@angular/core';
import { CryptoService } from '../../../crypto-service/crypto.service';
import { OAuthProviders } from '../../../../types/oauth-providers/oauth-providers';
import { State } from '../../../../types/interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private _cryptoService: CryptoService
  ) { }

  public generateState(provider: OAuthProviders, length: number = 32): string {
    const uniqueString: string = this.generateUniqueString(length);
    const stateObject: State = this.getStateObject(provider, uniqueString);
    return this.serializeStateToBase64Url(stateObject);
  }

  public deserializeState(stateBase64Url: string): State {
    const base64: string = this._cryptoService.convertBase64UrlToBase64(stateBase64Url);
    const json: string = this._cryptoService.convertBase64ToString(base64);
    return JSON.parse(json);
  }

  private getStateObject(
      provider: OAuthProviders,
      uniqueString: string
    ): State {

    return {
      provider,
      uniqueString
    }
  }

  private serializeStateToBase64Url(stateObject: State): string {
    const json: string = JSON.stringify(stateObject);
    const bytes: Uint8Array = this._cryptoService.convertStringToBytes(json);
    const base64: string = this._cryptoService.convertBytesToBase64(bytes);
    return this._cryptoService.convertBase64ToBase64Url(base64);
  }

  private generateUniqueString(length: number = 32) {
    const bytesArray: Uint8Array = this._cryptoService.generateRandomBytes(length);
    const base64String: string = this._cryptoService.convertBytesToBase64(bytesArray);
    return base64String;
  }
}
