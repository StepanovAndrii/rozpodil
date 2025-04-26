import { Validators } from "@angular/forms";
import { CombinedValidator } from "../../types/named-combined-validator";

export const maxLengthValidator = (max: number): CombinedValidator => ({
    title: 'maxlength',
    type: 'sync',
    description: `Максимальна довжина - ${max}`,
    fn: Validators.maxLength(max)
});