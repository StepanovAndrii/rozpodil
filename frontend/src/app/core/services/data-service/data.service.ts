import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  public async getTasks() {
    if(isPlatformServer(this.platformId)){
      return await firstValueFrom(this.http.get('/api/tasks'));
    }

    return null;
  }

  public async getUser() {
    if(isPlatformServer(this.platformId)) {
      return await firstValueFrom(this.http.get('/api/users'));
    }

    return null;
  }
}
