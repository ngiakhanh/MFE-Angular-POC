import { InjectionToken } from "@angular/core";

export const LAZY_ELEMENT_OPTIONS = new InjectionToken<LazyElementOptions>(
  'LAZY_ELEMENT_OPTIONS'
);

export interface LazyElementOptions {
  urlToPrefetch?: string[];
}
