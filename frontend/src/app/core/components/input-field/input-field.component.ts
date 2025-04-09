import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  imports: [],
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  @Input() inputFieldId!: string;
  @Input() inputType: string = 'text';
}
