import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, Inject, OnDestroy, Renderer2, TemplateRef, ViewContainerRef, effect, input } from '@angular/core';
import { defer, of, mergeMap, catchError } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';
import { Parcel } from 'single-spa';

@Directive({
    selector: '[lazyDynamicElement]',
    standalone: true
})
export class LazyDynamicElementDirective implements OnDestroy {
  tagName = input.required<string>({alias: 'lazyDynamicElement'});
  appName = input.required<string>({alias: 'lazyDynamicElementAppName'});

  private _currentParcel: Parcel | undefined;
  private _currentMfeContainer: HTMLElement | undefined;
  constructor(
    private singleSpaService: SingleSpaService,
    private cdr: ChangeDetectorRef,
    private template: TemplateRef<HTMLElement>,
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
      effect(async () => {
        const appName = this.appName();
        const tagName = this.tagName();
        this.vcr.clear();
        if (!appName || !tagName) {
          return;
        }

        this._currentMfeContainer ??= this.document.createElement('div');
        defer(() =>
          this._currentParcel && this._currentParcel.getStatus() === 'MOUNTED'
            ? this._currentParcel.unmount()
            : of(null)
        ).pipe(
          mergeMap(_ => this.singleSpaService.mount(appName, this._currentMfeContainer!, {isElement: true})),
          mergeMap(_ => customElements.whenDefined(tagName)),
          catchError(_ => (of(undefined)))
        )
        .subscribe(_ => {
          const originalCreateElement = this.renderer.createElement;
          this.renderer.createElement = (name: string, namespace: string) => {
            return this.document.createElement(tagName);
          };
          this.vcr.createEmbeddedView(this.template);
          this.renderer.createElement = originalCreateElement;
          this.cdr.markForCheck();
        });
      });
  }

  async ngOnDestroy() {
    this.vcr.clear();
    await this._currentParcel?.unmount()
    this._currentMfeContainer?.remove();
  }

}
