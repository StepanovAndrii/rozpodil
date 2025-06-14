import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../named-combined-validator";

export const specialSymbolValidator: CombinedValidator = {
    title: 'specialSymbol',
    type: 'sync',
    description: 'Має містити спеціальний символ',
    fn: (control: AbstractControl): ValidationErrors | null => 
        /([^\w]|_)/u.test(control.value) ? null : { 'specialSymbol': true }
};