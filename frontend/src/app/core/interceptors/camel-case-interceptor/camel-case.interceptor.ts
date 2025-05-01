import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { convertToCamelCase } from '../../utils/convert-to-camel-case';

export const camelCaseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const convertedBody = convertToCamelCase(event.body);
        return event.clone({ body: convertedBody });
      }

      return event;
    })
  );
};
