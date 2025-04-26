import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-google-auth-action-button',
  imports: [],
  templateUrl: './google-auth-action-button.component.html',
  styleUrl: './google-auth-action-button.component.scss'
})
export class GoogleAuthActionButtonComponent {
  @Output() action = new EventEmitter<void>();

  public handleClick(): void {
    this.action.emit();
  }
}
