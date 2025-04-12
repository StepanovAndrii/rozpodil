import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMismatchValidator(passwordControl: AbstractControl) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (passwordControl.value !== control.value) {
            return { passwordMismatch: true };
        }
        return null;
    }
}