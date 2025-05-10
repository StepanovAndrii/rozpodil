import { Component, Input, input, OnInit, output } from '@angular/core';
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
  public isDropdownOpened: boolean = false; 

  public roomGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _http: HttpClient
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public toggle(): void {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  public selectOption(option: T): void {
    this.toggle();
    this.selectedOption.emit(option);
    this.selectedOptionValue = option;
  }

  public setFormMode(mode: 'name' | 'code'): void {
    this.initForm(mode);
  }

  public async processRoom(action: 'create' | 'join'): Promise<void> {
    action === 'create' 
      ? this.setFormMode('name')
      : this.setFormMode('code');

    if (this.roomGroup.valid) {
      this._toastService.show(ToastType.Error, "Невалідне значення");
      return;
    }

    try {
      await firstValueFrom(
        this._http.post(`/api/rooms/${action}`, this.roomGroup.value)
      );
    }
    catch (error) {
      console.error(error);
    }
  }

  private initForm(mode: 'name' | 'code' = 'name') {
    let syncValidators: ValidatorFn[] = [requiredValidator.fn];

    switch (mode) {
      case 'code':
        syncValidators.push(
          maxLengthValidator(6).fn,
          digitsOnlyValidator.fn
        )
        break;
    
      case 'name': 
        syncValidators.push(
          maxLengthValidator(50).fn
        )
        break;

      default:
        break;
    }

    this.roomGroup = this._formBuilder.group({
      [mode]: ['', syncValidators]
    });
  }
}
