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


function formatDates(body: any, visited: Set<any> = new Set()): any {
  const formattedBody = { ...body };

  // If the object has already been visited, avoid processing it again (prevents circular references)
  if (visited.has(body)) {
    return formattedBody;  // Skip the object to avoid infinite recursion
  }

  visited.add(body);  // Mark the current object as visited

  for (const key in formattedBody) {
    const value = formattedBody[key];

    if (value instanceof Date) {
      // If it's a Date object, format it
      formattedBody[key] = DateTime.fromJSDate(value).toFormat('dd/MM/yyyy');
    } else if (typeof value === 'string') {
      // If it's a string, try to parse it as an ISO date
      const date = DateTime.fromISO(value, { zone: 'utc' });
      if (date.isValid) {
        formattedBody[key] = date.toFormat('dd/MM/yyyy');
      }
    } else if (typeof value === 'object' && value !== null) {
      // If it's a nested object, call the function recursively, passing the visited Set
      formattedBody[key] = formatDates(value, visited);
    }
  }

  return formattedBody;
}
