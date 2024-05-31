import { enableProdMode, NgZone, importProvidersFrom } from '@angular/core';
import { Router, NavigationStart, provideRouter } from '@angular/router';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';
import { BrowserModule, bootstrapApplication, createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppElementComponent } from './app/app-element.component';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    if ((singleSpaProps as any).isElement) {
      return createApplication({providers: getSingleSpaExtraProviders()}).then(appRef => {
        if (!customElements.get("app-two")) {
          const element = createCustomElement(AppElementComponent, { injector: appRef.injector })
          customElements.define("app-two", element);
        }
        return appRef;
      });
    }
    createApplication({providers: getSingleSpaExtraProviders()}).then(appRef => {
      if (!customElements.get("app-two")) {
        const element = createCustomElement(AppElementComponent, { injector: appRef.injector })
        customElements.define("app-two", element);
      }
      return appRef;
    });
    return bootstrapApplication(AppComponent, {
      providers: [
        ...getSingleSpaExtraProviders(),
        importProvidersFrom(BrowserModule),
        provideRouter(routes),
        // provideExperimentalZonelessChangeDetection()
      ]
  });
  },
  template: '<app2-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
