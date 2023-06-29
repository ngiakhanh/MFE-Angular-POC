import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { ElementComponent } from './element/element.component';
import { LazyDynamicElementDirective } from './lazy-dynamic-element.directive';
import { LazyElementDirective } from './lazy-element.directive';
import { LazyElementByUrlDirective } from './lazy-element-by-url.directive';
import { CommonModule } from '@angular/common';
import { SingleSpaService } from 'src/service/single-spa.service';
import { LazyElementOptions, LAZY_ELEMENT_OPTIONS, LAZY_ELEMENT_PLATFORM_OPTIONS } from './lazy-element-token';

@NgModule({
  declarations: [
    ElementComponent,
    LazyDynamicElementDirective,
    LazyElementDirective,
    LazyElementByUrlDirective
   ],
  exports: [
    ElementComponent,
    LazyDynamicElementDirective,
    LazyElementDirective,
    LazyElementByUrlDirective
  ],
  imports: [
    CommonModule
  ],
})
export class LazyElementModule {
  static configure(
    options?: LazyElementOptions | null
  ): ModuleWithProviders<LazyElementModule> {
    return {
      ngModule: LazyElementModule,
      providers: [
        {
          provide: LAZY_ELEMENT_OPTIONS,
          useValue: options,
          multi: true
        }
      ],
    };
  }

  private option = inject<(LazyElementOptions | null | undefined)[]>(LAZY_ELEMENT_OPTIONS, { optional: true });
  private platformOption = inject<LazyElementOptions>(LAZY_ELEMENT_PLATFORM_OPTIONS, { optional: true });
  private singleSpaService = inject(SingleSpaService);
  constructor() {
    this.option ??= [];
    const combinedOptions = [this.platformOption, ...this.option];
    combinedOptions.filter(opt => opt && !opt.isAdded).forEach(opt => {
      if (opt) {
        opt.urlToPrefetch?.forEach(url => {
          this.singleSpaService.fetchParcelConfig(url).subscribe();
        });
        opt.isAdded = true
      }
    });
  }
}
