import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from "../../core/components/dropdown-menu/dropdown-menu.component";
import { IRoom } from '../../core/types/interfaces/room-interface';
import { PaddingComponent } from "../../core/components/padding/padding.component";
import { SettingButtonComponent } from "../../core/components/setting-button/setting-button.component";
import { IUser } from '../../core/types/interfaces/user-interface';
import { CalendarComponent } from "../../core/components/calendar/calendar.component";
import { Task } from '../../core/types/interfaces/task';
import { TaskCreationDialogComponent } from "../../core/components/task-creation-dialog/task-creation-dialog.component";
import { DateTime } from 'luxon';
import { DataService } from '../../core/services/data-service/data.service';
import { UUID } from 'crypto';
import { ChartsComponent } from "../../core/components/charts/charts.component";
import { SliderComponent } from "../../core/components/slider/slider.component";
import { ToastService } from '../../core/services/toast-service/toast.service';
import { ToastType } from '../../core/services/toast-service/models/toast-types';
import { TokenService } from '../../core/services/authentication/token-service/token.service';

@Component({
  selector: 'app-room',
  imports: [
    CommonModule,
    DropdownMenuComponent,
    PaddingComponent,
    SettingButtonComponent,
    CalendarComponent,
    TaskCreationDialogComponent,
    ChartsComponent,
    SliderComponent
],
  standalone: true,
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})

export class RoomComponent implements OnInit {
  public rooms: IRoom[] = [];
  public tasksForDay: Task[] = [];
  public user: IUser | null = null;
  public selectedRoom: IRoom | null = null;
  public tasksForSelectedDate: Task[] = []
  public taskCreationDialogIsVisible = signal<boolean>(false);
  public areChartsVisible = signal<boolean>(false);

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _toastService: ToastService,
    private _tokenService: TokenService
  ) { }

  public ngOnInit(): void {
    this._route.data.subscribe({
      next: (data) => {
        this.rooms = data['userRooms'];
        this.selectedRoom = data['room'];
        this.user = data['user'];
        this.tasksForSelectedDate = data['tasks']
      }
    })
  }

  public async loadTasks(day: DateTime) {
    this.tasksForSelectedDate = await this._dataService.getRoomTasks(this.selectedRoom?.id as UUID, day, day)
  }

  public changeAreChartsVisible(isVisible: boolean): void {
    this.areChartsVisible.set(isVisible);
  }

  public async toggleRoom(room: IRoom) {
    this._router.navigate([`/room/${room.id}`]);
  }

  public openTaskCreationDialog() {
    this.taskCreationDialogIsVisible.set(true);
  }

  public openRoomSettings() {
    this._router.navigate([`/room/${this.selectedRoom?.id}/settings`])
  }

  public copyRoomCode() {
    navigator.clipboard.writeText(this.selectedRoom!.code).then(() =>
      this._toastService.show(ToastType.Info, "Код кімнати було скопійовано")
    );
  }

  public openUserSettings() {
    this._router.navigate([`/users/${this._tokenService.getUserId()}/settings`])
  }
}
