import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from "@angular/forms";

export function specialSymbolValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => 
        /\p{S}/u.test(control.value) ? null : { oneSpecialSymbol: true };
}