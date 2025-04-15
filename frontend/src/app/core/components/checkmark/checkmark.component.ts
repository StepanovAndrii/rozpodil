import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-checkmark',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './checkmark.component.html',
  styleUrl: './checkmark.component.scss'
})
 
export class CheckmarkComponent {
  @Input() control!: AbstractControl<any, any> | null;
  
  public get isControlMissing(): boolean {
    return this.control === null;
  }

  public get isControlToched(): boolean {
    return !!this.control?.touched;
  }

  public get isControlValid(): boolean {
    return !!this.control?.valid;
  }
}
