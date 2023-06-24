import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { defer, mergeMap, of } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';

@Component({
  selector: 'my-app-element',
  templateUrl: './element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnChanges, OnDestroy {
  @Input() set appName(v: string){
    this._oldAppName = this.tagName;
    this._appName = v;
  }

  get appName(): string {
    return this._appName;
  }

  @Input() set tagName(v: string){
    this._tagName = v;
  }

  get tagName(): string {
    return this._tagName;
  }

  private _appName!: string;
  private _oldAppName!: string;
  private _tagName!: string;
  private _currentMfeContainer: HTMLElement | undefined;
  constructor(
    private singleSpaService: SingleSpaService,
    private cdr: ChangeDetectorRef,
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
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.singleSpaService.unmount(this.appName);
    this._currentMfeContainer?.remove();
  }
}