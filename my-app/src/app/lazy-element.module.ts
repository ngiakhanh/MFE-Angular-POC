import { InjectionToken, ModuleWithProviders, NgModule, inject } from '@angular/core';
import { ElementComponent } from './element/element.component';
import { LazyDynamicElementDirective } from './lazy-dynamic-element.directive';
import { LazyElementDirective } from './lazy-element.directive';
import { LazyElementByUrlDirective } from './lazy-element-by-url.directive';
import { CommonModule } from '@angular/common';
import { SingleSpaService } from 'src/service/single-spa.service';
import { LazyElementOptions, LAZY_ELEMENT_OPTIONS } from './lazy-element-token';

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
    options: LazyElementOptions
  ): ModuleWithProviders<LazyElementModule> {
    return {
      ngModule: LazyElementModule,
      providers: [
        {
          provide: LAZY_ELEMENT_OPTIONS,
          useValue: options
        }
      ],
    };
  }

  private option = inject(LAZY_ELEMENT_OPTIONS, { optional: true });
  private singleSpaService = inject(SingleSpaService);
  constructor() {
    const defaultOption: LazyElementOptions = {
      urlToPrefetch: []
    };

    if (!this.option) {
      this.option = defaultOption;
    }
    else {
      this.option = {...defaultOption, ...this.option};
    }

    if ((this.option.urlToPrefetch?.length ?? 0) > 0) {
      this.option.urlToPrefetch?.forEach(url => {
        this.singleSpaService.fetchParcelConfig(url).subscribe();
      });
    }
  }
}
