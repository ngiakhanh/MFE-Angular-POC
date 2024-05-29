import { enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(BrowserModule),
      provideRouter(routes),
      {
        provide: APP_BASE_HREF,
        useValue: '/'
      },
      //provideExperimentalZonelessChangeDetection()
  ]
}).catch(err => console.error(err));
