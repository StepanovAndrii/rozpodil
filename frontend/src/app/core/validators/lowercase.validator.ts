import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from "@angular/forms";

export function lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
        /\p{Ll}/u.test(control.value) ? null : { lowercase: true };
}