import { enableProdMode, NgZone, importProvidersFrom } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';



import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { AppElementModule } from './app/app-element.module';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppSandbox } from './app/app-sandbox';
import { Sandbox } from './app/sandbox';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    if ((singleSpaProps as any).isElement) {
      return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppElementModule);
    }
    platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppElementModule);
    return bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule),
        {
            provide: Sandbox,
            useExisting: AppSandbox
        }
    ]
});
  },
  template: '<app1-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
