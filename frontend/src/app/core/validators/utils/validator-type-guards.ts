import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { CombinedValidator } from "../../types/named-combined-validator";
import { NamedValidator } from "../../types/interfaces/validators/named-validator.interface";
import { NamedAsyncValidator } from "../../types/interfaces/validators/named-async-validator.interface";

export function getValidatorsPair(validators: CombinedValidator[]): [ValidatorFn[], AsyncValidatorFn[]] {
    const sync = validators
    .filter(validator => validator.type === 'sync')
    .map(validator => (validator as NamedValidator).fn);

  const async = validators
    .filter(validator => validator.type === 'async')
    .map(validator => (validator as NamedAsyncValidator).fn);

  return [sync, async];
}