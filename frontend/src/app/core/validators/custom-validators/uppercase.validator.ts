import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../named-combined-validator";

export const uppercaseValidator: CombinedValidator = {
    title: 'uppercase',
    type: 'sync',
    description: 'Має містити велику літеру',
    fn: (control: AbstractControl): ValidationErrors | null =>
        /\p{Lu}/u.test(control.value) ? null : { uppercase: true }
};