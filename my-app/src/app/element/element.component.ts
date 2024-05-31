import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy, effect, inject, input } from '@angular/core';
import { defer, mergeMap, of } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';
import { Parcel } from 'single-spa';

@Component({
    selector: 'my-app-element',
    templateUrl: './element.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./element.component.scss'],
    standalone: true
})
export class ElementComponent {
  appName = input.required<string>();
  tagName = input.required<string>();

  private currentParcel: Parcel | undefined;
  private currentMfeContainer: HTMLElement | undefined;
  private singleSpaService = inject(SingleSpaService);
  private cdr = inject(ChangeDetectorRef);
  private document = inject(DOCUMENT);
  constructor() {
    effect(() => {
      const appName = this.appName();
        const tagName = this.tagName();
        if (!appName || !tagName) {
          return;
        }

        this.currentMfeContainer ??= this.document.createElement('div');
        defer(() =>
          this.currentParcel && this.currentParcel.getStatus() === 'MOUNTED'
            ? this.currentParcel.unmount()
            : of(null)
        ).pipe(
          mergeMap(_ => this.singleSpaService.mount(appName, this.currentMfeContainer!, {isElement: true})),
          mergeMap(parcel => customElements.whenDefined(tagName).then(_ => parcel))
        )
        .subscribe(parcel => {
          this.currentParcel = parcel;
          this.cdr.markForCheck();
        });
      });
  }

  async ngOnDestroy() {
    await this.currentParcel?.unmount();
    this.currentMfeContainer?.remove();
  }
}
