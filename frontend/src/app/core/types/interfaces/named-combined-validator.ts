import { NamedAsyncValidator } from "./named-async-validator.interface";
import { NamedValidator } from "./named-validator.interface";

export type CombinedValidator = NamedValidator | NamedAsyncValidator;