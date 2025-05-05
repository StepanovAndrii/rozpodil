import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { requiredValidator } from '../../../core/validators/built-in-validators/required.validator';
import { InputFieldComponent } from "../../../core/components/input-field/input-field.component";
import { maxLengthValidator } from '../../../core/validators/built-in-validators/max-length.validator';
import { minLengthValidator } from '../../../core/validators/built-in-validators/min-length.validator';
import { ToastService } from '../../../core/services/toast-service/toast.service';
import { ToastType } from '../../../core/services/toast-service/models/toast-types';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, pipe, throwError } from 'rxjs';
import { UUID } from 'crypto';
import { IRoom } from '../../../core/types/interfaces/room-interface';
import { error } from 'console';

@Component({
  selector: 'app-room-joining',
  imports: [ReactiveFormsModule, InputFieldComponent],
  standalone: true,
  templateUrl: './room-joining.component.html',
  styleUrl: './room-joining.component.scss'
})
export class RoomJoiningComponent implements OnInit{
  public roomJoiningForm!: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _httpClient: HttpClient
  ) { }
  
  ngOnInit(): void {
    this.initForm();
  }

  public changeToCreate() : void {
    this._router.navigate(['/room/create'], { replaceUrl: true })
  }

  // TODO: винести якось зручно валідацію (як було на реєстрації а моде і краще)
  private initForm(): void {
      this.roomJoiningForm = this._formBuilder.group({ 
        code: ['', [
          requiredValidator.fn,
          maxLengthValidator(6).fn,
          minLengthValidator(6).fn]]
      });
    }

  public sendRoomCodeAndJoinAsync() {
    if (this.roomJoiningForm.invalid)
      this._toastService.show(ToastType.Error, "Код повинен складатись з 6 цифр");

    this._httpClient.post("/api/rooms/join", {code: this.roomJoiningForm.value.code})
      .pipe(
        map((result) => result as IRoom),
        catchError((error) => {
          this._toastService.show(ToastType.Error, "Не вдалося приєднатись до кімнати");
          return throwError(() => error);
        })
      ).subscribe({
        next: (result) => {
         this._router.navigate([`/room`, result.id]);  
        }
      });
  }
}
