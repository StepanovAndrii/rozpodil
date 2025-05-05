import { ResolveFn } from '@angular/router';
import { IRoom } from '../../types/interfaces/room-interface';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';
import { UUID } from 'crypto';

export const fetchRoomByIdAsyncResolver: ResolveFn<IRoom> = async (routes, state) => {
  const dataService: DataService = inject(DataService);
  const id = routes.paramMap.get('id');
  if (!id) throw new Error('Немає параметра з id кімнати');
  return await dataService.getRoomById((id as UUID));
}

// TODO: зверни увагу на назви файлів та резолверів