import { ResolveFn } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const dataService: DataService = inject(DataService);
  return dataService;
};
