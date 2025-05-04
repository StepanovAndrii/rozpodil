import { maxLengthValidator } from "../../../core/validators/built-in-validators/max-length.validator";
import { minLengthValidator } from "../../../core/validators/built-in-validators/min-length.validator";
import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";
import { noWhitespaceValidator } from "../../../core/validators/custom-validators/no-whitespace.validator";
import { CombinedValidator } from "../../../core/validators/named-combined-validator";

// TODO: об'єднати це з register валідаторами, багато схожостей
export const passwordNamedValidators: CombinedValidator[] = [
    minLengthValidator(8),
    maxLengthValidator(64),
    requiredValidator,
    noWhitespaceValidator
];