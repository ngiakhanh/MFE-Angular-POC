import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, ElementRef, Inject, Injectable, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { defer, of, mergeMap } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicElementLoaderService {
  private _oldAppName!: string;
  private _currentMfeContainer: HTMLElement | undefined;
  constructor(
    private singleSpaService: SingleSpaService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
  }

  loadElement(
    appName: string,
    tagName: string,
    vcr: ViewContainerRef,
    elementSetupFn: (element: HTMLElement) => void): void {
    if (appName || tagName) {
      return;
    }

    this._currentMfeContainer ??= this.document.createElement('div');
    defer(() =>
      this._oldAppName
        ? this.singleSpaService.unmount(this._oldAppName)
        : of(null)
    ).pipe(
      mergeMap(_ => this.singleSpaService.mount(appName, this._currentMfeContainer!)),
      mergeMap(_ => customElements.whenDefined(tagName))
    )
    .subscribe(_ => {
      vcr.clear();
      const element = this.document.createElement(tagName);
      elementSetupFn(element);
      (vcr.element as ElementRef<HTMLElement>).nativeElement.appendChild(element);
      this.cdr.markForCheck();
    });
  }

  loadElementByTemplate(
    appName: string,
    tagName: string,
    vcr: ViewContainerRef,
    template: TemplateRef<HTMLElement>): void {
    if (appName || tagName) {
      return;
    }
    //single-spa-angular still in angular 15
    //this.singleSpaService.getMfeParcelConfig('app2').subscribe(config => this.config.set(config));
    this._currentMfeContainer ??= this.document.createElement('div');
    defer(() =>
      this._oldAppName
        ? this.singleSpaService.unmount(this._oldAppName)
        : of(null)
    ).pipe(
      this._takeUntilDestroyed,
      mergeMap(_ => this.singleSpaService.mount(appName, this._currentMfeContainer!)),
      mergeMap(_ => customElements.whenDefined(tagName))
    )
    .subscribe(_ => {
      vcr.clear();
      const originalCreateElement = this.renderer.createElement;
      this.renderer.createElement = (name: string, namespace: string) => {
        return this.document.createElement(tagName);
      };
      vcr.createEmbeddedView(template);
      this.renderer.createElement = originalCreateElement;
      this.cdr.markForCheck();
    });
  }
}
