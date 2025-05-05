import { ResolveFn } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';
import { IRoom } from '../../types/interfaces/room-interface';

export const dropdownRoomsResolver: ResolveFn<IRoom[]> = async (route, state) => {
  const dataService: DataService = inject(DataService);
  return await dataService.getRoomsForDropdownByUserId();
};
