import { HttpContextToken } from "@angular/common/http";

export const SKIP_TOKEN_CHECK = new HttpContextToken<boolean>(() => false);