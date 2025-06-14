import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../named-combined-validator";

export const lowercaseValidator: CombinedValidator = {
    title: 'lowercase',
    type: 'sync',
    description: 'Має містити малу літеру',
    fn: (control: AbstractControl): ValidationErrors | null =>
        /\p{Ll}/u.test(control.value) ? null : { lowercase: true }
};