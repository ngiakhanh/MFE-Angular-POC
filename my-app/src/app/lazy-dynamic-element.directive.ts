import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, Inject, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { defer, of, mergeMap } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';
import { Parcel } from 'single-spa';

@Directive({
    selector: '[lazyDynamicElement]',
    standalone: true
})
export class LazyDynamicElementDirective {
  @Input('lazyDynamicElement') set tagName(v: string){
    this._tagName = v;
  }

  get tagName(): string {
    return this._tagName;
  }

  @Input('lazyDynamicElementAppName') set appName(v: string){
    this._appName = v;
  }

  get appName(): string {
    return this._appName;
  }

  private _appName!: string;
  private _currentParcel: Parcel | undefined;
  private _tagName!: string;
  private _currentMfeContainer: HTMLElement | undefined;
  constructor(
    private singleSpaService: SingleSpaService,
    private cdr: ChangeDetectorRef,
    private template: TemplateRef<HTMLElement>,
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnChanges(): void {
    if (!this.appName || !this.tagName) {
      return;
    }

    this._currentMfeContainer ??= this.document.createElement('div');
    defer(() =>
      this._currentParcel && this._currentParcel.getStatus() === 'MOUNTED'
        ? this._currentParcel.unmount()
        : of(null)
    ).pipe(
      mergeMap(_ => this.singleSpaService.mount(this.appName, this._currentMfeContainer!, {isElement: true})),
      mergeMap(_ => customElements.whenDefined(this.tagName))
    )
    .subscribe(_ => {
      this.vcr.clear();
      const originalCreateElement = this.renderer.createElement;
      this.renderer.createElement = (name: string, namespace: string) => {
        return this.document.createElement(this.tagName);
      };
      this.vcr.createEmbeddedView(this.template);
      this.renderer.createElement = originalCreateElement;
      this.cdr.markForCheck();
    });
  }

  async ngOnDestroy() {
    await this._currentParcel?.unmount()
    this._currentMfeContainer?.remove();
  }

}
