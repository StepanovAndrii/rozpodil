import { CombinedValidator } from "../../../core/validators/named-combined-validator";
import { emailValidator } from "../../../core/validators/custom-validators/email-format.validator";
import { maxLengthValidator } from "../../../core/validators/built-in-validators/max-length.validator";
import { minLengthValidator } from "../../../core/validators/built-in-validators/min-length.validator";
import { requiredValidator } from "../../../core/validators/built-in-validators/required.validator";
import { createEmailExistsValidator } from "../../../core/validators/custom-validators/create-email-exists.validator";
import { HttpClient } from "@angular/common/http";

// TODO: розібратись чому поле майже завжди невалідне
export function createEmailNamedValidators(http: HttpClient): CombinedValidator[] {
    return [
        minLengthValidator(5),
        maxLengthValidator(100),
        requiredValidator,
        emailValidator,
        createEmailExistsValidator(http)
    ]
};