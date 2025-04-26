import { ValidatorFn } from "@angular/forms";

export interface NamedValidator {
    title: string;
    type: 'sync';
    description: string;
    fn: ValidatorFn;
}