import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRoom } from '../../types/interfaces/room-interface';
import { IUser } from '../../types/interfaces/user-interface';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(
    private http: HttpClient
  ) { }

  // TODO: повертається цілий об'єкет. А якщо я хочу тільки id? вирішити
  public async getRoomsByUserId(userId: UUID, limit?: number): Promise<IRoom[]> {
    let params = new HttpParams();

    console.log(limit + "limit")
    if (limit) {
      params = params.set('limit', limit.toString());
    }

    console.log(params.toString() + "параметри")
    const response = await firstValueFrom(
      this.http.get<IRoom[]>(`/api/users/${userId}/rooms`, {params})
    );

    // TODO: переробити перевірку на нормальну
    if (Array.isArray(response)
      && response.every(item => typeof item === 'object'))
      return response;

    return [];
  }

  public async getUserById(userId: UUID): Promise<IUser> {
    return await firstValueFrom(
      this.http.get<IUser>(`/api/users/${userId}`)
    );
  }
}
