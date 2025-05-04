import {
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { requiredValidator } from '../../../core/validators/built-in-validators/required.validator';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-room-creation',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './room-creation.component.html',
  styleUrl: './room-creation.component.scss'
})

export class RoomCreationComponent implements OnInit{
  public roomCreationForm!: FormGroup;
  
  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  // винести в окремий сервіс
  public async sendRoomCreationRequestAsync(): Promise<void> {
    if (this.roomCreationForm.valid) {
      firstValueFrom(
        await this._httpClient.post(
          "/api/room/create",
          this.roomCreationForm.value,
          { withCredentials: true }
        )
      );
    }
  }

  public changeToJoin() : void {
    this._router.navigate(['/room/join'], { replaceUrl: true })
  }

  private initForm(): void {
    this.roomCreationForm = this._formBuilder.group({ 
      name: ['', requiredValidator.fn]
    });
  }
}
