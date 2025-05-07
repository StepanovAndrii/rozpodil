import { Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

// TODO: розібрати до кінця
export class CalendarComponent {
  public currentDate = signal(DateTime.now().setLocale('uk'));
  public selectedWeek: { start: DateTime, end: DateTime } | null = null;

  constructor() {
    this.resetWeek();
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
