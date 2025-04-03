import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { SelectivePreloadingStrategy } from './core/preloading-strategies/selective-preloading.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    SelectivePreloadingStrategy,
    provideRouter(
      routes, withPreloading(SelectivePreloadingStrategy)
    ),
    provideHttpClient(), 
    provideClientHydration(withEventReplay())
  ]
};
