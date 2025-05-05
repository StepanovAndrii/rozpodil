import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from "../../core/components/dropdown-menu/dropdown-menu.component";
import { IRoom } from '../../core/types/interfaces/room-interface';
import { SettingButtonComponent } from "../../core/components/setting-button/setting-button.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, DropdownMenuComponent, SettingButtonComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public rooms: IRoom[] = [];
  public selectedRoom: IRoom | null = null;
  public username: string = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe( data =>
      this.rooms = data['userRooms']
    )
  }

  public onRoomSelected(room: IRoom): void {
    this.selectedRoom = room;
  }
}
