import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';

// TODO: change any to model
export const taskResolver: ResolveFn<any> = async (route, state) => {
  const dataService: DataService = inject(DataService);
  return await dataService.getTasks();
};
