import { signal, Signal } from "@angular/core";
import { sign } from "crypto";

export enum WeekDay {
    Monday = 'Пн',
    Tuesday = 'Вт',
    Wednesday = 'Ср',
    Thursday = 'Чт',
    Friday = 'Пт',
    Saturday = 'Сб',
    Sunday = 'Вс'
}

const weekDaysArray = Object.values(WeekDay);

export const weekDays: Signal<string[]> = signal(weekDaysArray);