import { ResolveFn } from '@angular/router';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';

export const achievementResolver: ResolveFn<boolean> = (route, state) => {
   const dataService: DataService = inject(DataService);
  return true;
};
