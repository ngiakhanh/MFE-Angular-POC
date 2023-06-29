import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LAZY_ELEMENT_PLATFORM_OPTIONS } from './app/lazy-element-token';

if (environment.production) {
  enableProdMode();
}

fetch('/assets/lazy-element-config.json').then(async res => {
  const config = await res.json();
  platformBrowserDynamic([
    { provide: LAZY_ELEMENT_PLATFORM_OPTIONS, useValue: config }
  ]).bootstrapModule(AppModule).catch(err => console.error(err));
});
