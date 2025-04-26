import { AsyncValidatorFn } from "@angular/forms";

export interface NamedAsyncValidator {
    title: string;
    type: 'async';
    description: string;
    fn: AsyncValidatorFn;
}