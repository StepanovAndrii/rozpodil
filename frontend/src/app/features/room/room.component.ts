import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from "../../core/components/dropdown-menu/dropdown-menu.component";
import { IRoom } from '../../core/types/interfaces/room-interface';

@Component({
  selector: 'app-room',
  imports: [
    CommonModule,
    DropdownMenuComponent
  ],
  standalone: true,
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})

export class RoomComponent implements OnInit {
  public rooms: IRoom[] = [];
  public selectedRoom: IRoom | null = null;

  constructor (
    private _route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._route.data.subscribe({
      next: (data) => {
        this.rooms = data['userRooms'];
        this.selectedRoom = data['room']
      }
    })
  }
}
