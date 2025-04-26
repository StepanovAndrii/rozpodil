import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";
import { maxLengthValidator } from "../../../core/validators/built-in-validators/max-length.validator";
import { minLengthValidator } from "../../../core/validators/built-in-validators/min-length.validator";
import { lowercaseValidator } from "../../../core/validators/custom-validators/lowercase.validator";
import { noWhitespaceValidator } from "../../../core/validators/custom-validators/no-whitespace.validator";
import { oneDigitValidator } from "../../../core/validators/custom-validators/one-digit.validator";
import { specialSymbolValidator } from "../../../core/validators/custom-validators/one-special-symbol.validator";
import { uppercaseValidator } from "../../../core/validators/custom-validators/uppercase.validator";
import { CombinedValidator } from "../../../core/types/named-combined-validator";

export const passwordNamedValidators: CombinedValidator[] = [
    minLengthValidator(8),
    maxLengthValidator(64),
    requiredValidator,
    lowercaseValidator,
    uppercaseValidator,
    noWhitespaceValidator,
    oneDigitValidator,
    specialSymbolValidator
];