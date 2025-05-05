import { ResolveFn } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';
import { IUser } from '../../types/interfaces/user-interface';

export const userResolver: ResolveFn<IUser> = async (route, state) => {
  const dataService: DataService = inject(DataService);
  return await dataService.getUser();
};
