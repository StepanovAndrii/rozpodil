import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from "../../core/components/dropdown-menu/dropdown-menu.component";
import { IRoom } from '../../core/types/interfaces/room-interface';
import { SettingButtonComponent } from "../../core/components/setting-button/setting-button.component";
import { IUser } from '../../core/types/interfaces/user-interface';
import { CalendarComponent } from "../../core/components/calendar/calendar.component";
import { ITask } from '../../core/types/interfaces/task';
import { ToastService } from '../../core/services/toast-service/toast.service';
import { ToastType } from '../../core/services/toast-service/models/toast-types';
import { DoughnutChartComponent } from "../../core/components/charts/doughnut-chart/doughnut-chart.component";
import { LeftSidebarComponent } from "../../core/components/left-sidebar/left-sidebar.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, DropdownMenuComponent, SettingButtonComponent, CalendarComponent, DoughnutChartComponent, LeftSidebarComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit{
  public user: IUser | null = null;
  public rooms: IRoom[] = [];
  public tasks: ITask[] = [];
  public selectedRoom: IRoom | null = null;

  isLeftSidebarCollapsed = signal<boolean>(true);

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    const selecterRoomId = this._route.snapshot.paramMap.get('id');

    this._route.data.subscribe({
      next: (data) => {
          this.user = data['user'];
          this.rooms = data['userRooms'];
          this.tasks = data['tasks']
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

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapse: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapse);
  }

  async copyCode(): Promise<void> {
    await navigator.clipboard.writeText(this.selectedRoom!.code);
    this._toastService.show(ToastType.Success, "Код скопійовано");
  }

  public onRoomSelected(room: IRoom): void {
    this.selectedRoom = room;
    this._router.navigate(["/room", room.id])
  }

  public openUserSettings() {
    
  }

  public openRoomSettings() {
    this._router.navigate(['settings'], { relativeTo: this._route })
  }
}
