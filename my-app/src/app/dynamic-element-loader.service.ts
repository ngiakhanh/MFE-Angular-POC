import { DOCUMENT } from '@angular/common';
import { ElementRef, EmbeddedViewRef, Inject, Injectable, Renderer2, RendererFactory2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { of, mergeMap, Observable, map } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicElementLoaderService {
  private _currentMfeContainer: HTMLElement | undefined;
  private renderer: Renderer2;
  constructor(
    private singleSpaService: SingleSpaService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  loadElement<T>(
    appName: string,
    tagName: string,
    vcr: ViewContainerRef,
    elementSetupFn: (element: NgElement & WithProperties<T>) => void): Observable<NgElement & WithProperties<T> | undefined>{
    if (!appName || !tagName || !vcr) {
      return of(undefined);
    }

    this._currentMfeContainer ??= this.document.createElement('div');
    return this.singleSpaService.mount(appName, this._currentMfeContainer!).pipe(
      mergeMap(_ => customElements.whenDefined(tagName)),
      map(_ => {
        vcr.clear();
        const element: NgElement & WithProperties<T> = this.document.createElement(tagName) as any;
        elementSetupFn(element);
        const beforeNode = (vcr.element as ElementRef<HTMLElement>).nativeElement;
        beforeNode.parentNode?.insertBefore(element, beforeNode.nextSibling);
        return element;
      })
    );
  }

  loadElementByTemplate(
    appName: string,
    tagName: string,
    vcr: ViewContainerRef,
    template: TemplateRef<HTMLElement>): Observable<EmbeddedViewRef<HTMLElement> | undefined> {
    if (!appName || !tagName || !vcr) {
      return of(undefined);
    }

    this._currentMfeContainer ??= this.document.createElement('div');
    return this.singleSpaService.mount(appName, this._currentMfeContainer!).pipe(
      mergeMap(_ => customElements.whenDefined(tagName)),
      map(_ => {
        vcr.clear();
        const originalCreateElement = this.renderer.createElement;
        this.renderer.createElement = (name: string, namespace: string) => {
          return this.document.createElement(tagName);
        };
        const viewRef = vcr.createEmbeddedView(template);
        this.renderer.createElement = originalCreateElement;
        return viewRef;
      })
    )
  }
}
