import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IRoom } from '../../types/interfaces/room-interface';
import { IUser } from '../../types/interfaces/user-interface';
import { UUID } from 'crypto';
import { IUsersRoles } from '../../types/interfaces/users-roles';
import { RoomRole } from '../../types/room-role-enum';
import { DateTime } from 'luxon';
import { ITask } from '../../types/interfaces/task';

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

    if (limit) {
      params = params.set('limit', limit.toString());
    }

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

  public async getUserRolesByRoomId(roomId: UUID): Promise<IUsersRoles[]> {
    return await firstValueFrom(
      this.http.get<IUsersRoles[]>(`api/rooms/${roomId}/users`)
    );
  }

  public async getRoomById(roomId: UUID) {
    return await firstValueFrom(
      this.http.get<IRoom>(`/api/rooms/${roomId}`)
    );
  }

  // TODO: порозбиртись
  public async getRoomTasks(roomId: UUID, from?: DateTime, to?: DateTime): Promise<ITask[]> {
    const params = new HttpParams({
      fromObject: {
        ...(from ? { from: from.toISO() ?? '' } : {}),
        ...(to ? { to: to.toISO() ?? '' } : {})
      }
    });
  
    return await firstValueFrom(
      this.http.get<ITask[]>(`/api/rooms/${roomId}/tasks`, { params })
    );
  }
}
