import { Component, input, CUSTOM_ELEMENTS_SCHEMA
 } from '@angular/core';
import { Task } from '../../types/interfaces/task';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent {
  tasks = input.required<Task[] | null>();

  
}
