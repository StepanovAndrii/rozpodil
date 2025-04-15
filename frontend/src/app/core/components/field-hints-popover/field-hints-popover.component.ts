import {
  Component,
  Input,
  Signal,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { AbstractControl } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CombinedValidator } from '../../types/interfaces/named-combined-validator';
import { ValidationHintComponent } from "../validation-hint/validation-hint.component";

@Component({
  selector: 'app-field-hints-popover',
  imports: [CommonModule, ValidationHintComponent],
  standalone: true,
  templateUrl: './field-hints-popover.component.html',
  styleUrl: './field-hints-popover.component.scss'
})

export class FieldHintsPopoverComponent {
  @Input() focused!: Signal<boolean>;
  @Input() control!: AbstractControl<any, any> | null;
  @Input() validators: CombinedValidator[] | null = null;
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  public hasError(validatorTitle: string): boolean {
    if (!this.control?.value) {
      return true;
    }
    return !!this.control?.errors?.[validatorTitle];
  }
}
