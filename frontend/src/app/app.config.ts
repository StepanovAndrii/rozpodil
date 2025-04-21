import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { SelectivePreloadingStrategy } from './core/preloading-strategies/selective-preloading.strategy';
import { loadingInterceptor } from './core/interceptors/loading-interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    SelectivePreloadingStrategy,
    provideRouter(
      routes, withPreloading(SelectivePreloadingStrategy)
    ),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor
      ])
    ), 
    provideClientHydration(withEventReplay())
  ]
};
