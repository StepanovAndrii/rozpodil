import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../named-combined-validator";

export const digitsOnlyValidator: CombinedValidator = {
    title: 'email',
    type: 'sync',
    description: 'Поле повинно містити лише цифри',
    fn: (control: AbstractControl): ValidationErrors | null =>
        /^\d+$/.test(control.value) ? null : { 'digitsOnly' : true }
};