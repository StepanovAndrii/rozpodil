import { NamedAsyncValidator } from "../types/interfaces/validators/named-async-validator.interface";
import { NamedValidator } from "../types/interfaces/validators/named-validator.interface";

export type CombinedValidator = NamedValidator | NamedAsyncValidator;