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

  public async getRoomsByUserId(userId: UUID): Promise<IRoom[]> {
    const response = await firstValueFrom(
      this.http.get<IRoom[]>(`/api/users/${userId}/rooms`)
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
