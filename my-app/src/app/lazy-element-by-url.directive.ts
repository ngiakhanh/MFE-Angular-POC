import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, Inject, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { defer, of, mergeMap } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';
import { Parcel } from 'single-spa';

@Directive({
    selector: '[lazyElementByUrl]',
    standalone: true
})
export class LazyElementByUrlDirective {
  @Input('lazyElementByUrl') set url(v: string){
    this._url = v;
  }

  get url(): string {
    return this._url;
  }

  private _url!: string;
  private _currentParcel: Parcel | undefined;
  private _tagName!: string;
  private _currentMfeContainer: HTMLElement | undefined;
  constructor(
    private singleSpaService: SingleSpaService,
    private cdr: ChangeDetectorRef,
    private template: TemplateRef<HTMLElement>,
    private vcr: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnChanges(): void {
    this._tagName = this.getElementTag();
    if (!this.url || !this._tagName) {
      return;
    }

    this._currentMfeContainer ??= this.document.createElement('div');
    defer(() =>
      this._currentParcel && this._currentParcel.getStatus() === 'MOUNTED'
        ? this._currentParcel.unmount()
        : of(null)
    ).pipe(
      mergeMap(_ => this.singleSpaService.mountByUrl(this.url, this._currentMfeContainer!, {isElement: true})),
      mergeMap(_ => customElements.whenDefined(this._tagName))
    )
    .subscribe(_ => {
      this.vcr.clear();
      this.vcr.createEmbeddedView(this.template);
      this.cdr.markForCheck();
    });
  }

  async ngOnDestroy() {
    await this._currentParcel?.unmount()
    this._currentMfeContainer?.remove();
  }

  private getElementTag(): string {
    const tpl = this.template as any;
    return tpl._declarationTContainer
      ? tpl._declarationTContainer.tagName || tpl._declarationTContainer.value
      : tpl._def.element.template.nodes[0].element.name;
  }
}
