import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- 1. Make sure this is imported here
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // 2. Keep this active
    provideHttpClient(), // 3. Explicitly declare HttpClient here so it links with the zone
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};