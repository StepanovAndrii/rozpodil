import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IUser } from '../../core/types/interfaces/user-interface';
import { IUsersRoles } from '../../core/types/interfaces/users-roles';
import { InputFieldComponent } from "../../core/components/input-field/input-field.component";
import { IRoom } from '../../core/types/interfaces/room-interface';

@Component({
  selector: 'app-room-settings',
  imports: [InputFieldComponent],
  templateUrl: './room-settings.component.html',
  styleUrl: './room-settings.component.scss'
})

export class RoomSettingsComponent implements OnInit{
  public usersRoles: IUsersRoles[] | [] = [];
  public room: IRoom | null = null;

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe({
      next: (data) => {
        this.usersRoles = data['roomUsersRoles'];
        this.room = data['room'];
      }
    });
  }
}
