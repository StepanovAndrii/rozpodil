import { ActivatedRoute, ResolveFn } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';
import { UUID } from 'crypto';
import { IUser } from '../../types/interfaces/user-interface';
import { inject } from '@angular/core';

export const roomUsersResolver: ResolveFn<IUser[]> = async (route, state) => {
  const dataService: DataService = inject(DataService);

  const roomId = route.paramMap.get('id');

  if (roomId)
    return await dataService.getUsersByRoomId(roomId as UUID);

  return [];
};
