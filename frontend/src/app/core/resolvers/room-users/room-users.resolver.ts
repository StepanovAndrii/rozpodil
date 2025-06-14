import { ActivatedRoute, ResolveFn } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';
import { UUID } from 'crypto';
import { inject } from '@angular/core';
import { IUsersRoles } from '../../types/interfaces/users-roles';

export const roomUsersResolver: ResolveFn<IUsersRoles[]> = async (route, state) => {
  const dataService: DataService = inject(DataService);

  const roomId = route.paramMap.get('id');

  if (roomId)
    return await dataService.getUserRolesByRoomId(roomId as UUID);
    
  return [];
};
