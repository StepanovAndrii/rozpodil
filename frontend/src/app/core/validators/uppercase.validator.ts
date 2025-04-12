import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from "@angular/forms";

export function uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
        /\p{Lu}/u.test(control.value) ? null : { uppercase: true };
}