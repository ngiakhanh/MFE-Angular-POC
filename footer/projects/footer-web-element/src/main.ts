import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}
createApplication().then(appRef => {
  if (!customElements.get("k-footer")) {
    const element = createCustomElement(AppComponent, { injector: appRef.injector })
    customElements.define("k-footer", element);
  }
  return appRef;
}).catch(err => console.error(err));

