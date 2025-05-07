import { ResolveFn } from '@angular/router';
import { IRoom } from '../../types/interfaces/room-interface';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';
import { UUID } from 'crypto';

export const roomResolver: ResolveFn<IRoom | null> = async (route, state) => {
  const dataService: DataService = inject(DataService);

  const roomId = route.paramMap.get('id');

  if (roomId)
      return await dataService.getRoomById(roomId as UUID);

  return null;
};
