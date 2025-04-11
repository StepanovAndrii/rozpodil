import { 
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { OnChangeFn } from '../types/on-change-fn.types';
import { OnTouchedFn } from '../types/on-touched-fn.types';

@Component({
  selector: 'app-input-field',
  imports: [],
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(
      () => InputFieldComponent
    ),
    multi: true
  }]
})

export class InputFieldComponent implements ControlValueAccessor {
  @Input() inputFieldId!: string;
  @Input() inputType: string = 'text';
  @Input() value: string = '';

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

  writeValue(value: string): void {
    if(value === null) return;
    this.value = value;
    this.changeDetector.detectChanges();
  }

  registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }
}

