import { maxLengthValidator } from "../../../core/validators/built-in-validators/max-length.validator";
import { minLengthValidator } from "../../../core/validators/built-in-validators/min-length.validator";
import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";
import { emailValidator } from "../../../core/validators/custom-validators/email-format.validator";
import { CombinedValidator } from "../../../core/validators/named-combined-validator";

export const emailNamedValidators: CombinedValidator[] = [
    minLengthValidator(8),
    maxLengthValidator(64),
    requiredValidator,
    emailValidator
];