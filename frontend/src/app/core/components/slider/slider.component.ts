import { Component, input, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Task } from '../../types/interfaces/task';
import { DateTime } from 'luxon';
import { TaskStatus } from '../../types/task-status-enum';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UUID } from 'crypto';
import { firstValueFrom } from 'rxjs';
import { TokenService } from '../../services/authentication/token-service/token.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastType } from '../../services/toast-service/models/toast-types';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SliderComponent implements OnInit {
  public tasks = input.required<Task[] | null>();
  public roomId: UUID | null = null;
  public taskStatuses = TaskStatus;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _tokenService: TokenService,
    private _toast: ToastService
  ) { }

  public ngOnInit(): void {
    this.roomId = this._route.snapshot.paramMap.get('id') as UUID;
  }

  public async markAsInProgress(task: Task) {
    const patchDoc = [
      { op: "replace", path: "/status", value: this.taskStatuses.InProgress }
    ];
    await firstValueFrom(
      this._http.patch(`/api/rooms/${this.roomId}/tasks/${task.id}`, patchDoc)
    )
    // TODO: Продумати як замінити пусте тіло на нормальне рішення
    await firstValueFrom(
      this._http.patch(`/api/rooms/${this.roomId}/tasks/${task.id}/asign`, {})
    );
  }

  public async completeTask(task: Task): Promise<void> {
    if (task.assignedTo!.id !== this._tokenService.getUserId()) {
      this._toast.show(ToastType.Error, "Завдання не ваше!")
      return;
    }

    const patchDoc = [
      { op: "replace", path: "/status", value: this.taskStatuses.Completed },
      { op: "replace", path: "/completedAt", value: DateTime.local().toUTC() }
    ];
    await firstValueFrom (
      this._http.patch(`/api/rooms/${this.roomId}/tasks/${task.id}`, patchDoc)
    )
  }

  // TODO: винести в окрему утиліту
  public formatDate(date: string): string {
    return DateTime.fromISO(date).toFormat('dd/MM/yy');
  }
}