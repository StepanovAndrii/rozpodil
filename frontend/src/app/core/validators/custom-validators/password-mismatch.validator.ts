import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../../types/named-combined-validator";

export const passwordMismatchValidator = (passwordControl: AbstractControl): CombinedValidator => ({
    title: 'passwordMismatch',
    type: 'sync',
    description: 'Паролі повинні співпадати',
    fn: (control: AbstractControl): ValidationErrors | null => {
        if (passwordControl.value === control.value) {
            return null;
        }

        return {'passwordMismatch': true};
    }
});