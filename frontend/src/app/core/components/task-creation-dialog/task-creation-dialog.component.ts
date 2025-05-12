import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, computed, effect, Input, OnInit, Signal, WritableSignal } from '@angular/core';
import { InputFieldComponent } from "../input-field/input-field.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { requiredValidator } from '../../validators/built-in-validators/required.validator';
import { DataService } from '../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import localeUk from '@angular/common/locales/uk';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { DateTime } from 'luxon';
import { AutoFormatDateDirective } from '../../directives/auto-format-date.directive';
import { firstValueFrom } from 'rxjs';
import { TokenService } from '../../services/authentication/token-service/token.service';

registerLocaleData(localeUk, 'uk');

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: string): string {
    const day = this._to2digit(date.getDate());
    const month = this._to2digit(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private _to2digit(n: number): string {
    return ('00' + n).slice(-2);
  }
}

@Component({
  selector: 'app-task-creation-dialog',
  imports: [CommonModule, InputFieldComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, AutoFormatDateDirective],
  standalone: true,
  templateUrl: './task-creation-dialog.component.html',
  styleUrl: './task-creation-dialog.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'uk' },
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class TaskCreationDialogComponent implements OnInit{
  @Input() createTask!: WritableSignal<boolean>;
  public taskCreationForm!: FormGroup;
  minDate = DateTime.now().toJSDate();


  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _token: TokenService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public close() {
    this.createTask.set(false);
  }

  private initForm() {
    this.taskCreationForm = this._formBuilder.group({
      title: new FormControl<string>('', requiredValidator.fn),
      description: new FormControl<string>(''),
      deadline: new FormControl<Date | null>(null, requiredValidator.fn)
    });
  }

  public async createTaskMethod() {
    const selectedRoomId = this._route.snapshot.paramMap.get('id');
    
    if (this.taskCreationForm.valid) {
      const taskDto = {
        ...this.taskCreationForm.value,
        createdAt: DateTime.now().toUTC().toISO(),
        roomId: selectedRoomId,
        userId: this._token.getUserId()
      }
     
      try {
        await firstValueFrom(
          this._http.post(`/api/rooms/${selectedRoomId}/tasks`, taskDto)
        );
        this.close();
      } catch (error) {
        console.error('Помилка створення завдання:', error);
      }
    } else {
      console.error('Форма не валідна');
    }
  }  
}
