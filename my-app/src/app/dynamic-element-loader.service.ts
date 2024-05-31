import { DOCUMENT } from '@angular/common';
import { ElementRef, EmbeddedViewRef, Injectable, RendererFactory2, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { of, mergeMap, Observable, map } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicElementLoaderService {
  private currentMfeContainer: HTMLElement | undefined;
  private singleSpaService = inject(SingleSpaService);
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private document = inject(DOCUMENT);

  loadElement<T>(
    appName: string,
    tagName: string,
    vcr: ViewContainerRef): Observable<HTMLElement & T | undefined>{
    if (!appName || !tagName || !vcr) {
      return of(undefined);
    }

    this.currentMfeContainer ??= this.document.createElement('div');
    return this.singleSpaService.mount(appName, this.currentMfeContainer!, {isElement: true}).pipe(
      mergeMap(_ => customElements.whenDefined(tagName)),
      map(_ => {
        vcr.clear();
        const element: HTMLElement & T = this.document.createElement(tagName) as any;
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

    this.currentMfeContainer ??= this.document.createElement('div');
    return this.singleSpaService.mount(appName, this.currentMfeContainer!, {isElement: true}).pipe(
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
