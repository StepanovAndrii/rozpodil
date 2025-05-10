import { Component, input, InputSignal } from '@angular/core';
import { Task } from '../../types/interfaces/task';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  tasks = input.required<Task[] | null>();

    // public getTasksForDay(day: string): ITask[] {
    // return this.tasks.filter(task =>
    //   task.getDueTime().hasSame(DateTime.fromISO(day), 'day')
    // );

      // public async onDateSelect(date: DateTime) {
      //   this.selectedDay = date;
      //   const selecterRoomId = this._route.snapshot.paramMap.get('id');
      //   if (selecterRoomId) {
      //     try {
      //       this.tasks = await this._dataService.getRoomTasks(selecterRoomId as UUID, date, date);
      //     }
      //     catch(error){
      //       console.error(error);
      //     }      
      //   }
      // }
}
