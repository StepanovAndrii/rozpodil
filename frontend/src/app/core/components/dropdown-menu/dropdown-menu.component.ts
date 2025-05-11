import { Component, effect, ElementRef, Input, input, OnInit, output, Renderer2, signal } from '@angular/core';
import { DropdownOption } from './types/dropdown-option';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, ValidatorFn } from '@angular/forms';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastType } from '../../services/toast-service/models/toast-types';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NamedValidator } from '../../types/interfaces/validators/named-validator.interface';
import { NamedAsyncValidator } from '../../types/interfaces/validators/named-async-validator.interface';
import { requiredValidator } from '../../validators/built-in-validators/required.validator';
import { CombinedValidator } from '../../validators/named-combined-validator';
import { maxLengthValidator } from '../../validators/built-in-validators/max-length.validator';
import { digitsOnlyValidator } from '../../validators/custom-validators/digits-only.validator';
import { minLengthValidator } from '../../validators/built-in-validators/min-length.validator';

@Component({
  selector: 'app-dropdown-menu',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})

export class DropdownMenuComponent<T extends DropdownOption> implements OnInit {
  @Input() public selectedOptionValue!: T | null;
  public options = input.required<T[]>()
  public selectedOption = output<T>();
  public isDropdownOpened = signal(false); 

  public roomGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _http: HttpClient,
    private _renderer: Renderer2,
    private _elementRef: ElementRef<HTMLElement>
  ) {
      effect(() => {
        if (this.isDropdownOpened()) {
          this.registerClickOutside();
        }
      });
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public toggle(): void {
    this.isDropdownOpened.set(!this.isDropdownOpened());
  }

  public selectOption(option: T): void {
    this.toggle();
    this.selectedOption.emit(option);
    this.selectedOptionValue = option;
  }

  // TODO: покращити, бо виглядає так собі
  public async processRoom(action: 'create' | 'join'): Promise<void> {
    const nameSyncValidators = [requiredValidator.fn, maxLengthValidator(64).fn]
    const codeSyncValidators = [requiredValidator.fn, minLengthValidator(6).fn, maxLengthValidator(6).fn, digitsOnlyValidator.fn]

    this.roomGroup.get('name')?.clearValidators();
    this.roomGroup.get('code')?.clearValidators();

    switch (action) {
      case 'create':
        this.roomGroup.get('name')?.setValidators(nameSyncValidators);
        break;
      case 'join':
        this.roomGroup.get('code')?.setValidators(codeSyncValidators);
        break;
    }
    
    this.roomGroup.get('name')?.updateValueAndValidity();
    this.roomGroup.get('code')?.updateValueAndValidity();

    if ((action === 'create' && this.roomGroup.get('name')?.invalid) ||
      (action === 'join' && this.roomGroup.get('code')?.invalid)) {

      this._toastService.show(ToastType.Error, "Невалідне значення");
      return;
    }

    try {
      await firstValueFrom(
        this._http.post(`/api/rooms/${action}`, {
          name: this.roomGroup.get('name')?.value,
          code: this.roomGroup.get('code')?.value
        })
      );
    }
    catch (error) {
      console.error(error);
    }
  }

  // TODO: зробити краще (як в реєстрації)
  private initForm() {
    this.roomGroup = this._formBuilder.group({
      'name': [''],
      'code': ['']
    });
  }

  // TODO: розібрати
  private registerClickOutside() {
    const clickListener = this._renderer.listen('document', 'click', (event: Event) => {
      if (!this._elementRef.nativeElement.contains(event.target as Node)) {
        this.isDropdownOpened.set(false);
        clickListener();
      }
    })
  }
}
