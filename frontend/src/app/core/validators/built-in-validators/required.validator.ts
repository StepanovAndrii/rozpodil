import { Validators } from "@angular/forms";
import { CombinedValidator } from "../named-combined-validator";

export const requiredValidator: CombinedValidator = {
    title: 'required',
    type: 'sync',
    description: 'Поле є обов\'язковим',
    fn: Validators.required
};