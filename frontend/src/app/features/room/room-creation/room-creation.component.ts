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
import { UUID } from 'crypto';

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
        this._httpClient.post<UUID>(
          "/api/rooms/create",
          this.roomCreationForm.value
        ).subscribe({
          next: (roomId: UUID) => {
            console.log(roomId);
            this._router.navigate(['/room', roomId]);
          },
          error: () => {
            this._router.navigate(['/login']);
          }
        });
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
