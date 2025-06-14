import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common'

@Component({
  selector: 'app-toggle-eye',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './toggle-eye.component.html',
  styleUrl: './toggle-eye.component.scss'
})

export class ToggleEyeComponent {
  @Input() isPasswordVisible: boolean = false;
  @Output() toggled = new EventEmitter<void>();

  public toggle(): void {
    this.toggled.emit();
  }
}
