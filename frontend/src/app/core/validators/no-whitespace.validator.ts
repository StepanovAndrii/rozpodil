import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
        /\s/.test(control.value) ? { whitespace: true } : null;
}