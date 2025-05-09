import { ResolveFn } from '@angular/router';
import { ITask, Task } from '../../types/interfaces/task';
import { DataService } from '../../services/data-service/data.service';
import { inject } from '@angular/core';
import { UUID } from 'crypto';
import { DateTime } from 'luxon';

export const roomTasksResolver: ResolveFn<ITask[]> = async (route, state) => {
  const dataService: DataService = inject(DataService);

  const roomId = route.paramMap.get('id');

  const startOfWeek = DateTime.now()
    .setLocale('uk')
    .startOf('week');
  const endOfWeek = startOfWeek.endOf('week');

  if (roomId) {
    var itasks = await dataService.getRoomTasks(roomId as UUID, startOfWeek, endOfWeek);
    return itasks.map(taskData => new Task(taskData));
  }
    

  return [];
};
