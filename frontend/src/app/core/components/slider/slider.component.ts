import { Component, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Task } from '../../types/interfaces/task';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent {
  tasks = input.required<Task[] | null>();

  // TODO: винести в окрему утиліту
  public formatDate(date: string): string {
    return DateTime.fromISO(date).toFormat('dd/MM/yy');
  }
}