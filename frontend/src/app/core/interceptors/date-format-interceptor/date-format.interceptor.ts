import { HttpInterceptorFn } from '@angular/common/http';
import { DateTime } from 'luxon';

export const dateFormatInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.body && typeof req.body === 'object') {
    const formattedBody = formatDates(req.body);
    const clonedRequest = req.clone({ body: formattedBody });
    return next(clonedRequest);
  }
  return next(req);
};

function formatDates(body: any): any {
  const formattedBody = { ...body };

  for (const key in formattedBody) {
    const value = formattedBody[key];

    if (value instanceof Date) {
      formattedBody[key] = DateTime.fromJSDate(value).toFormat('dd/MM/yyyy');
    } else if (typeof value === 'string') {
      const date = DateTime.fromISO(value, { zone: 'utc' });
      if (date.isValid) {
        formattedBody[key] = date.toFormat('dd/MM/yyyy');
      }
    } else if (typeof value === 'object' && value !== null) {
      formattedBody[key] = formatDates(value);
    }
  }

  return formattedBody;
}
