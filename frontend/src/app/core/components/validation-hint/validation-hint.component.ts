import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-hint',
  imports: [CommonModule],
  templateUrl: './validation-hint.component.html',
  styleUrl: './validation-hint.component.scss'
})

export class ValidationHintComponent {
  @Input() isFieldValid: boolean = false;
  @Input() validatorTitle!: string;
}
