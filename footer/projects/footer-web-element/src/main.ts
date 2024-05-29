import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(BrowserModule)
  ]
}).then(appRef => {
  const element = createCustomElement(AppComponent, { injector: appRef.injector })
  customElements.define("k-footer", element);
}).catch(err => console.error(err));
