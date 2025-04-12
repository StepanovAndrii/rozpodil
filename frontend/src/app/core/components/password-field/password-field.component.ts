import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { ToggleEyeComponent } from "../toggle-eye/toggle-eye.component";
import { InputFieldComponent } from '../input-field/input-field.component';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { OnChangeFn } from '../../types/on-change-fn.types';
import { OnTouchedFn } from '../../types/on-touched-fn.types';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [
    ToggleEyeComponent,
    InputFieldComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(
      () => PasswordFieldComponent
    ),
    multi: true
  }],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss'
})

export class PasswordFieldComponent implements ControlValueAccessor{
  @Input() inputFieldId!: string;

  public value: string = '';
  public isPasswordVisible: boolean = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public constructor(
    private readonly changeDetector: ChangeDetectorRef
  ) { }

  public onInputValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;
    this.onChange(value);
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public preventShortcutIfInvisible(event: KeyboardEvent): void {
    const blockedKeys = ['c', 'x'];
    
    if(!this.isPasswordVisible){
      if(event.metaKey &&
        blockedKeys.includes(event.key.toLowerCase())) 
      {
        event.preventDefault();
      }
    }
  }

  public writeValue(value: string): void {
    if(value === null) return;
    this.value = value;
    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }
}
