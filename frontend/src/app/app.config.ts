import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { SelectivePreloadingStrategy } from './core/preloading-strategies/selective-preloading.strategy';
import { authInterceptor } from './core/interceptors/auth-interceptor/auth.interceptor';
import { camelCaseInterceptor } from './core/interceptors/camel-case-interceptor/camel-case.interceptor';
import { toastInterceptor } from './core/interceptors/toast-interceptor/toast.interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    SelectivePreloadingStrategy,
    provideRouter(
      routes, withPreloading(SelectivePreloadingStrategy)
    ),
    provideHttpClient(
      withInterceptors([
        camelCaseInterceptor,
       // authInterceptor,
       // errorInterceptor,
        toastInterceptor
      ])
    ), 
    provideClientHydration(withEventReplay())
  ]
};
