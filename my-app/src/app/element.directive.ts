import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, Inject, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { defer, of, mergeMap } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';

@Directive({
  selector: '[lazyElement]'
})
export class ElementDirective {
  @Input('lazyElement') set tagName(v: string){
    this._tagName = v;
  }

  get tagName(): string {
    return this._tagName;
  }

  @Input('lazyElementAppName') set appName(v: string){
    this._oldAppName = this.tagName;
    this._appName = v;
  }

  get appName(): string {
    return this._appName;
  }

  private _appName!: string;
  private _oldAppName!: string;
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
      this._oldAppName
        ? this.singleSpaService.unmount(this._oldAppName)
        : of(null)
    ).pipe(
      mergeMap(_ => this.singleSpaService.mount(this.appName, this._currentMfeContainer!)),
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

  ngOnDestroy(): void {
    this.singleSpaService.unmount(this.appName);
    this._currentMfeContainer?.remove();
  }

}
