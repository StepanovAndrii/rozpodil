import { Component, computed, effect, Input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { ITask } from '../../types/interfaces/task';
import { TaskCreationDialogComponent } from '../task-creation-dialog/task-creation-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

// TODO: розібрати до кінця
// TODO: вивчити і використати завантаженнями чанками
export class CalendarComponent {
  @Input() tasks: ITask[] = [];
  public currentDate = signal(DateTime.now().setLocale('uk'));
  public selectedWeek: { start: DateTime, end: DateTime } | null = null;

  constructor( ) {
    this.resetWeek();
   }
  
  formatDay(day: DateTime): string {
    return day.toFormat('ccc dd.MM.yy').replace(/^./, (match) => match.toUpperCase());
  }

  public getTasksForDay(day: DateTime): ITask[] {
    return this.tasks.filter(task =>
      task.dueTime.hasSame(day, 'day')
    );
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

  public selectWeek(week: { start: DateTime, end: DateTime }) {
    this.selectedWeek = week;
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
