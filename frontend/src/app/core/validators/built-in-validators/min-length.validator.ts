import { Validators } from "@angular/forms";
import { CombinedValidator } from "../../types/interfaces/named-combined-validator";

export const minLengthValidator = (min: number): CombinedValidator => ({
    title: 'minlength',
    type: 'sync',
    description: `Мінімальна довжина - ${min}`,
    fn: Validators.minLength(min)
});