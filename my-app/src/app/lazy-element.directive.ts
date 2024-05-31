import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { defer, of, mergeMap } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';
import { Parcel } from 'single-spa';

@Directive({
    selector: '[lazyElement]',
    standalone: true
})
export class LazyElementDirective {
  appName = input.required<string>({alias: 'lazyElement'});

  private currentParcel: Parcel | undefined;
  private tagName!: string;
  private currentMfeContainer: HTMLElement | undefined;

  private singleSpaService = inject(SingleSpaService);
  private cdr = inject(ChangeDetectorRef);
  private template = inject(TemplateRef<HTMLElement>);
  private vcr = inject(ViewContainerRef);
  private document = inject(DOCUMENT);
  constructor() {
    effect(() => {
      this.tagName = this.getElementTag();
      const appName = this.appName();
      if (!appName || !this.tagName) {
        return;
      }

      this.currentMfeContainer ??= this.document.createElement('div');
      defer(() =>
        this.currentParcel && this.currentParcel.getStatus() === 'MOUNTED'
          ? this.currentParcel.unmount()
          : of(null)
      ).pipe(
        mergeMap(_ => this.singleSpaService.mount(appName, this.currentMfeContainer!, {isElement: true})),
        mergeMap(_ => customElements.whenDefined(this.tagName))
      )
      .subscribe(_ => {
        this.vcr.clear();
        this.vcr.createEmbeddedView(this.template);
        this.cdr.markForCheck();
      });
    })
  }

  async ngOnDestroy() {
    await this.currentParcel?.unmount()
    this.currentMfeContainer?.remove();
  }

  private getElementTag(): string {
    const tpl = this.template as any;
    return tpl._declarationTContainer
      ? tpl._declarationTContainer.tagName || tpl._declarationTContainer.value
      : tpl._def.element.template.nodes[0].element.name;
  }
}
