import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from "@angular/forms";

export function oneDigitValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => 
        /\d/.test(control.value) ? null : { oneDigit: true };
}