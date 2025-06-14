import { CombinedValidator } from "../../../core/validators/named-combined-validator";
import { maxLengthValidator } from "../../../core/validators/built-in-validators/max-length.validator";
import { minLengthValidator } from "../../../core/validators/built-in-validators/min-length.validator";
import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";

export const usernameNamedValidators: CombinedValidator[] = [
    minLengthValidator(3),
    maxLengthValidator(30),
    requiredValidator
];