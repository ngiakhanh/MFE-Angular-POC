import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, Input, OnChanges, Renderer2, TemplateRef, ViewChild, ViewContainerRef, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription, defer, of, switchMap } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';

@Component({
  selector: 'my-app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnChanges {
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

  private _takeUntilDestroyed = takeUntilDestroyed();
  private _appName!: string;
  private _oldAppName!: string;
  private _tagName!: string;
  private _subs: Subscription = new Subscription();
  private _currentComponent: HTMLElement | undefined;
  private _currentMfeContainer: HTMLElement | undefined;
  constructor(
    private singleSpaService: SingleSpaService,
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnChanges(): void {
    if (!this.appName || !this.tagName) {
      return;
    }
    //single-spa-angular still in angular 15
    //this.singleSpaService.getMfeParcelConfig('app2').subscribe(config => this.config.set(config));
    this._currentMfeContainer?.remove();
    this._currentMfeContainer = this.document.createElement('div');
    this._subs.unsubscribe();
    this._subs = defer(() =>
      this._oldAppName
        ? this.singleSpaService.unmount(this._oldAppName)
        : of(null)
    ).pipe(
      this._takeUntilDestroyed,
      switchMap(_ => this.singleSpaService.mount(this.appName, this._currentMfeContainer!))
    )
    .subscribe(_ => {
      this._currentComponent?.remove();
      this._currentComponent = this.document.createElement(this.tagName);
      this.host.nativeElement.appendChild(this._currentComponent);
      this.cdr.markForCheck();
    });
  }
}
