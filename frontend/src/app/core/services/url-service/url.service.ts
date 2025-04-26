import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { QueryParams } from '../../types/query-params';

@Injectable({
  providedIn: 'root'
})

export class UrlService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public getOriginUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.origin;
    }
    throw new Error("Неможливо отримати origin URL: код виконується поза браузером");
  }

  public getApiUrl(): string {
    return environment.API_URL;
  }

  public getQueryString(value: QueryParams): string {
    const stringified: Record<string, string> = {};

    for (const key in value) {
      if(value[key] !== undefined && value[key] !== null) {
        stringified[key] = String(value[key]);
      }
    }

    const params = new URLSearchParams(stringified).toString();
    return params ? `?${params}` : '';
  }
}
