import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from "../../core/components/dropdown-menu/dropdown-menu.component";
import { IRoom } from '../../core/types/interfaces/room-interface';
import { PaddingComponent } from "../../core/components/padding/padding.component";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-room',
  imports: [
    CommonModule,
    DropdownMenuComponent,
    PaddingComponent
],
  standalone: true,
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})

export class RoomComponent implements OnInit {
  public rooms: IRoom[] = [];
  public selectedRoom: IRoom | null = null;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this._route.data.subscribe({
      next: (data) => {
        this.rooms = data['userRooms'];
        this.selectedRoom = data['room']
      }
    })
  }

  public async toggleRoom(room: IRoom) {
    this._router.navigate([`/room/${room.id}`]);
  }
}
