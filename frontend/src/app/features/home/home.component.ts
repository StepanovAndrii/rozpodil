import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from "../../core/components/dropdown-menu/dropdown-menu.component";
import { IRoom } from '../../core/types/interfaces/room-interface';
import { SettingButtonComponent } from "../../core/components/setting-button/setting-button.component";
import { IUser } from '../../core/types/interfaces/user-interface';
import { CalendarComponent } from "../../core/components/calendar/calendar.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, DropdownMenuComponent, SettingButtonComponent, CalendarComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public user: IUser | null = null;
  public rooms: IRoom[] | [] = [];
  public selectedRoom: IRoom | null = null;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const selecterRoomId = this.route.snapshot.paramMap.get('id');

    this.route.data.subscribe({
      next: (data) => {
          this.user = data['user'];
          this.rooms = data['userRooms'];
      }
    });

    const selectedRoom = this.rooms.find(room => room.id == selecterRoomId)

    if (selectedRoom) {
      this.selectedRoom = selectedRoom;
    }
    else{
      this.rooms[0];
    }
  }

  public onRoomSelected(room: IRoom): void {
    this.selectedRoom = room;
  }

  public openUserSettings() {
    
  }

  public openRoomSettings() {

  }
}
