import { enableProdMode, NgZone, importProvidersFrom, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { Router, NavigationStart, provideRouter } from '@angular/router';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppSandbox } from './app/app-sandbox';
import { Sandbox } from './app/sandbox';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppElementModule } from './app/app.element.module';
import { APP_BASE_HREF } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    if ((singleSpaProps as any).isElement) {
      return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppElementModule);;
    }
    platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppElementModule);
    return bootstrapApplication(AppComponent, {
      providers: [
          ...getSingleSpaExtraProviders(),
          provideRouter(routes),
          {
            provide: APP_BASE_HREF,
            useValue: '/'
          },
          importProvidersFrom(BrowserModule),
          {
              provide: Sandbox,
              useExisting: AppSandbox
          },
          // provideExperimentalZonelessChangeDetection()
      ]
    })
  },
  template: '<app1-root />',
  Router,
  NavigationStart,
  NgZone: 'noop',
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
