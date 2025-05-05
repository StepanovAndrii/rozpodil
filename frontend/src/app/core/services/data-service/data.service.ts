import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRoom } from '../../types/interfaces/room-interface';
import { IUser } from '../../types/interfaces/user-interface';

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
    return await firstValueFrom(this.http.get<IUser>('/api/users/me'));
  }

  // TODO: зробити мб щоб завантажувалась потрохи через потік
  public async getRoomsForDropdownByUserId(): Promise<IRoom[]>  {
    return await firstValueFrom(this.http.get<IRoom[]>('api/rooms'));
  }
}
