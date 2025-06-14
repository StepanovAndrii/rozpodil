import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-task-button',
  imports: [],
  templateUrl: './delete-task-button.component.html',
  styleUrl: './delete-task-button.component.scss'
})
export class DeleteTaskButtonComponent {
  public isDeleted = input.required<boolean>();
  public onComponentDelete = output<boolean>();

  toggleCollapse(): void {
    this.onComponentDelete.emit(this.isDeleted());
  }
}
