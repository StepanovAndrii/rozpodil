import { CombinedValidator } from "../../../core/validators/named-combined-validator";
import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";
import { maxLengthValidator } from "../../../core/validators/built-in-validators/max-length.validator";
import { minLengthValidator } from "../../../core/validators/built-in-validators/min-length.validator";
import { digitsOnlyValidator } from "../../../core/validators/custom-validators/digits-only.validator";

export const verificationCodeValidators: CombinedValidator[] = [
    requiredValidator,
    maxLengthValidator(6),
    minLengthValidator(6),
    digitsOnlyValidator
];