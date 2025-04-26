import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  input,
  computed,
  Signal
} from '@angular/core';

import { ToggleEyeComponent } from "../toggle-eye/toggle-eye.component";
import { InputFieldComponent } from '../input-field/input-field.component';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { OnChangeFn } from '../../types/functions/on-change-fn.types';
import { OnTouchedFn } from '../../types/functions/on-touched-fn.types';

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
  @ViewChild(InputFieldComponent) input!: InputFieldComponent;

  public value: string = '';
  public isPasswordVisible: boolean = false;

  public readonly focused: Signal<boolean> = computed(
    () => this.input?.focused() ?? false
  );

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

  public onBlur() {
    this.onTouched();
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
