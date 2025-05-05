import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { camelCaseInterceptor } from './core/interceptors/camel-case-interceptor/camel-case.interceptor';
import { authInterceptor } from './core/interceptors/auth-interceptor/auth.interceptor';
import { SelectivePreloadingStrategy } from './core/preloading-strategies/selective-preloading.strategy';
import { toastInterceptor } from './core/interceptors/toast-interceptor/toast.interceptor';
import { appInitializer } from './core/initializers/app-initializer';

// розібратись чому не працю рефреш і як вирішити (через тости)
export const appConfig: ApplicationConfig = {
  providers: [
    appInitializer,
    provideZoneChangeDetection({ eventCoalescing: true }),
    SelectivePreloadingStrategy,
    provideRouter(
      routes,
      withPreloading(SelectivePreloadingStrategy)
    ),
    provideHttpClient(
      withInterceptors([
        toastInterceptor,
        authInterceptor,
        camelCaseInterceptor
      ])
    ), 
    provideClientHydration(withEventReplay())
  ]
};
