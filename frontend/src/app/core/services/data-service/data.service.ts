import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(
    private http: HttpClient
  ) { }

  public async getTasks() {
    return await firstValueFrom(this.http.get('https://localhost:7297/api/tasks'));
  }

  public async getUser() {
    return await firstValueFrom(this.http.get('/api/users'));
  }
}
