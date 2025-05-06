import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IUser } from '../../core/types/interfaces/user-interface';

@Component({
  selector: 'app-room-settings',
  imports: [],
  templateUrl: './room-settings.component.html',
  styleUrl: './room-settings.component.scss'
})
export class RoomSettingsComponent implements OnInit{
  public users: IUser[] | [] = [];

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe({
      next: (data) => {
        this.users = data['roomUsers'];
      }
    });
  }
 
}
