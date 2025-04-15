import { CombinedValidator } from "../../../core/types/interfaces/named-combined-validator";
import { emailValidator } from "../../../core/validators/custom-validators/email-format.validator";
import { maxLengthValidator } from "../../../core/validators/built-in-validators/max-length.validator";
import { minLengthValidator } from "../../../core/validators/built-in-validators/min-length.validator";
import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";

export const emailNamedValidators: CombinedValidator[] = [
    minLengthValidator(5),
    maxLengthValidator(100),
    requiredValidator,
    emailValidator
];