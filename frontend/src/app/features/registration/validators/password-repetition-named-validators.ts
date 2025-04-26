import { AbstractControl } from "@angular/forms";
import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";
import { passwordMismatchValidator } from "../../../core/validators/custom-validators/password-mismatch.validator";
import { CombinedValidator } from "../../../core/validators/named-combined-validator";

export const passwordRepetitionNamedValidators = (passwordControl: AbstractControl): CombinedValidator[] => { 
    return [
        requiredValidator,
        passwordMismatchValidator(passwordControl)
    ];
}