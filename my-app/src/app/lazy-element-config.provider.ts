import { ApplicationRef, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LazyElementOptions, LAZY_ELEMENT_OPTIONS, LAZY_ELEMENT_PLATFORM_OPTIONS } from './lazy-element-token';
import { SingleSpaService } from 'src/service/single-spa.service';

export function provideLazyElementConfig(options?: LazyElementOptions | null | undefined ): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LAZY_ELEMENT_OPTIONS,
      useValue: options,
      multi: true
    }
  ]);
}

export function addLazyElement(appRefPromise: Promise<ApplicationRef>): Promise<ApplicationRef> {
  return appRefPromise.then(appRef => initializeLazyElement(appRef));
}

export function initializeLazyElement(appRef: ApplicationRef): ApplicationRef {
  let option = appRef.injector.get<(LazyElementOptions | null | undefined)[]>(LAZY_ELEMENT_OPTIONS, undefined, {optional: true}) ?? [];
    const platformOption = appRef.injector.get<LazyElementOptions | undefined>(LAZY_ELEMENT_PLATFORM_OPTIONS, undefined, {optional: true});
    const singleSpaService = appRef.injector.get(SingleSpaService);
    const combinedOptions = [platformOption, ...option];
    combinedOptions.filter(opt => opt && !opt.isAdded).forEach(opt => {
      if (opt) {
        opt.urlToPrefetch?.forEach(url => {
          singleSpaService.fetchParcelConfig(url).subscribe();
        });
        opt.isAdded = true
      }
    });
    return appRef;
}
