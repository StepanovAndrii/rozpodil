import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastType } from '../../services/toast-service/models/toast-types';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        toastService.show(ToastType.Error, error.message);
        return of();
      })
    );
};
