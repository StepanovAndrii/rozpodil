import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

import { CombinedValidator } from "../named-combined-validator";
import {
    catchError,
    debounceTime,
    map,
    Observable,
    of,
    switchMap
} from "rxjs";

import {
    HttpClient,
    HttpContext
} from "@angular/common/http";

import { SKIP_TOKEN_CHECK } from "../../interceptors/http-context-tokens";

export function createEmailExistsValidator(http: HttpClient): CombinedValidator {
    const context = new HttpContext().set(SKIP_TOKEN_CHECK, true)
    
    // TODO: зрозуміти чому індикатор завжди зелений
    return {
        title: 'email',
        type: 'async',
        description: 'Email не зареєстрований',
        fn: (control: AbstractControl): Observable<ValidationErrors | null> => {
            return control.valueChanges.pipe(
                debounceTime(500),
                switchMap(email =>
                http.get<{ taken: boolean }>('/api/check-email', {
                    params: { email },
                    context
                })
                ),
                map(response => (response.taken ? { emailtaken: true } : null)),
                catchError(() => of({emailtaken: true}))
            );
        }
    }
};