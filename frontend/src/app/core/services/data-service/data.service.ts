import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRoom } from '../../types/interfaces/room-interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(
    private http: HttpClient
  ) { }

  public async getTasks() {
    return await firstValueFrom(this.http.get('/api/tasks'));
  }

  public async getUser() {
    return await firstValueFrom(this.http.get('/api/users'));
  }

  // TODO: зробити мб щоб завантажувалась потрохи через потік
  public async getRoomsForDropdownByUserId(): Promise<IRoom[]>  {
    return await firstValueFrom(this.http.get<IRoom[]>('api/rooms'));
  }
}
