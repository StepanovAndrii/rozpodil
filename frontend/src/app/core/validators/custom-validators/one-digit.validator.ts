import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../../types/named-combined-validator";

export const oneDigitValidator: CombinedValidator = {
    title: 'digit',
    type: 'sync',
    description: 'Має містити цифру',
    fn: (control: AbstractControl): ValidationErrors | null => 
        /\d/.test(control.value) ? null : { 'digit': true }
};