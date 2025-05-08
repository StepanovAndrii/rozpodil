import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

registerLocaleData(localeUk, 'uk');

@Directive({
  selector: '[appAutoFormatDate]',
  standalone: true
})

export class AutoFormatDateDirective {
  @Input() appAutoFormatDate: string = 'DD/MM/YYYY';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (this.appAutoFormatDate === 'DD/MM/YYYY') {
      if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
      if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    }

    if (this.appAutoFormatDate === 'MM/DD/YYYY') {
      if (value.length > 2) value = value.slice(0, 2) + '/';
      if (value.length > 4) value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/';
      if (value.length > 8) value = value.slice(0, 10);
    }

    input.value = value;
  }

  @HostListener('blur')
  onBlur() {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = this.correctDate(input.value);
  }

  private correctDate(date: string): string {
    const parts = date.split('/');
    let [day, month, year] = parts.map((p) => parseInt(p) || 0);

    if (this.appAutoFormatDate === 'DD/MM/YYYY') {
      if (month > 12) month = 12;
      if (year && month) {
        const maxDays = DateTime.fromObject({ year, month }).daysInMonth ?? 31;
        if (day > maxDays) day = maxDays;
      } else if (day > 31) {
        day = 31;
      }
    }

    if (this.appAutoFormatDate === 'MM/DD/YYYY') {
      if (day > 12) day = 12;
      if (year && day) {
        const maxDays = DateTime.fromObject({ year, month: day }).daysInMonth ?? 31;
        if (month > maxDays) month = maxDays;
      } else if (month > 31) {
        month = 31;
      }
    }

    if (year < 1900) year = 1900;
    if (year > DateTime.now().year + 100) year = DateTime.now().year + 100;

    return [
      day ? day.toString().padStart(2, '0') : '',
      month ? month.toString().padStart(2, '0') : '',
      year ? year.toString() : ''
    ]
      .filter(Boolean)
      .join('/');
  }
}

export const MY_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};