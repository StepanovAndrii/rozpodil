import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";
import { CombinedValidator } from "../../types/interfaces/named-combined-validator";

export const emailValidator: CombinedValidator = {
    title: 'email',
    type: 'sync',
    description: 'Email має бути у форматі name@example.com',
    fn: (control: AbstractControl): ValidationErrors | null =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value) ? null : { email: true }
};