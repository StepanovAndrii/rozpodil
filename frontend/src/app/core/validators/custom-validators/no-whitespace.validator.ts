import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../../types/interfaces/named-combined-validator";

export const noWhitespaceValidator: CombinedValidator = {
    title: 'noWhitespace',
    type: 'sync',
    description: 'Не повинно містити пробіли',
    fn: (control: AbstractControl): ValidationErrors | null =>
        /\s/.test(control.value) ? { 'noWhitespace': true } : null
};