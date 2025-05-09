import { Component, computed, effect, inject, Input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { ITask, Task } from '../../types/interfaces/task';
import { CommonModule } from '@angular/common';
import { InfoPopUpComponent } from "../info-pop-up/info-pop-up.component";
import { DataService } from '../../services/data-service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'crypto';
import { error } from 'console';
import { TaskCreationDialogComponent } from "../task-creation-dialog/task-creation-dialog.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskStatus } from '../../types/task-status-enum';
import { firstValueFrom } from 'rxjs';
import { translateTaskStatus } from '../../utils/status-translation.util';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, InfoPopUpComponent, TaskCreationDialogComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

// TODO: розібрати до кінця
// TODO: вивчити і використати завантаженнями чанками
export class CalendarComponent {
  @Input() tasks: Task[] = [];
  public hoveredDay: DateTime | null = null;
  public currentDate = signal(DateTime.now().setLocale('uk'));
  public selectedDay: DateTime = DateTime.now().setLocale('uk');
  public selectedWeek: { start: DateTime, end: DateTime } | null = null;
  public createTask: WritableSignal<boolean> = signal(false);
  roomId: UUID | null = null;

  constructor( 
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _http: HttpClient,
  ) {
    this.resetWeek();
    this.roomId = this._route.snapshot.paramMap.get('id') as UUID;
   }

   public formatTasksEnum(status: string) {
    return translateTaskStatus(status);
   }
  
  public formatDay(day: DateTime): string {
    return day.toFormat('ccc').replace(/^./, (match) => match.toUpperCase());
  }

  public formatData(day: DateTime): string {
    return day.toFormat('dd.MM');
  }

  public getTasksForDay(day: string): ITask[] {
    return this.tasks.filter(task =>
      task.getDueTime().hasSame(DateTime.fromISO(day), 'day')
    );
  }

  public async markTaskAsMade(task: Task) {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json-patch+json'
      });

      const patchData = [
        { op: 'replace', path: '/status', value: 'completed' },
      ]

      await firstValueFrom (
        this._http.patch(`/api/rooms/${this.roomId}/tasks/${task.id}`, patchData, { headers })
      ) 
    } catch (error) {
      console.error(error);
    }
  }

  public isCurrentWeek(week: { start: DateTime, end: DateTime }): boolean {
    const now = DateTime.now().setLocale('uk').setZone(week.start.zoneName ?? 'local');
    return now >= week.start && now <= week.end;
  }  
  
  public weeks = computed(() => 
    Array.from({ length: 4 }).map((_, index) => {
      const startOfWeek = this.currentDate().startOf('week').plus({ weeks: index });
      return {
        start: startOfWeek,
        end: startOfWeek.endOf('week')
      };
    })
  );

  public isSelectedWeek(week: { start: DateTime, end: DateTime }): boolean {
    if (!this.selectedWeek) {
      return false;
    }
    return this.selectedWeek.start.hasSame(week.start, 'week') && this.selectedWeek.end.hasSame(week.end, 'week');
  }

  public selectWeek(week: { start: DateTime, end: DateTime }) {
    this.selectedWeek = week;
  }

  public onDayHover(day: DateTime | null) {
    this.hoveredDay = day;
  }

  public async onDateSelect(date: DateTime) {
    this.selectedDay = date;
    const selecterRoomId = this._route.snapshot.paramMap.get('id');
    if (selecterRoomId) {
      try {
        this.tasks = await this._dataService.getRoomTasks(selecterRoomId as UUID, date, date);
      }
      catch(error){
        console.error(error);
      }      
    }
  }

  public nextWeek() {
    this.currentDate.update((date) => date.plus({ weeks: 1 }));
  }

  public previousWeek() {
    this.currentDate.update((date) => date.minus({ weeks: 1 }));
  }

  public getDaysOfWeek(week: { start: DateTime, end: DateTime }): DateTime[] {
    const days: DateTime[] = [];
    let currentDay = week.start;

    while (currentDay <= week.end) {
      days.push(currentDay);
      currentDay = currentDay.plus({ days: 1 });
    }

    return days;
  }

  public openCreationDialog() {
    this.createTask.set(true);
  }

  private resetWeek() {
    const now = DateTime.now();
    const startOfCurrentWeek = now.startOf('week').setLocale('uk');
    if (now > this.currentDate().endOf('week')) {
      this.currentDate.set(startOfCurrentWeek);
    }

    this.selectedWeek = {
      start: startOfCurrentWeek,
      end: startOfCurrentWeek.endOf('week')
    };
  }

}
