import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../services/loading-service/loading.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService: LoadingService = inject(LoadingService);
  loadingService.show();
  return next(req)
    .pipe(
      tap({
        next: (response) => { },
        error: (error) => loadingService.hide(),
        complete: () => loadingService.hide()
      })
    );
};
