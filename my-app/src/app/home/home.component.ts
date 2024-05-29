import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Injector, OnInit, TemplateRef, ViewChild, ViewContainerRef, WritableSignal, inject, signal, viewChild } from '@angular/core';
import { Observable, Subscribable, catchError, defer, mergeMap, of } from 'rxjs';
import { ParcelConfig, mountRootParcel } from 'single-spa';
import { SingleSpaService } from 'src/service/single-spa.service';
import { DynamicElementLoaderService } from '../dynamic-element-loader.service';
import { Parcel } from 'single-spa';
import { AppSettingsService } from 'src/service/app-settings.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { LazyElementByUrlDirective } from '../lazy-element-by-url.directive';
import { LazyDynamicElementDirective } from '../lazy-dynamic-element.directive';
import { LazyElementDirective } from '../lazy-element.directive';
import { ElementComponent } from '../element/element.component';
import { ParcelComponent } from 'single-spa-angular/parcel';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'my-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeaderComponent, ParcelComponent, ElementComponent, LazyElementDirective, LazyDynamicElementDirective, LazyElementByUrlDirective, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit  {
  title: WritableSignal<string> = signal('shell');
  currentActiveApp: string = 'app2';
  currentActiveTag: string = 'app-two';
  mountRootParcel = mountRootParcel;
  config: Signal<ParcelConfig | null> = signal(null);
  clickString: string = '';

  container0 = viewChild.required('container0', {read: ElementRef});
  // @ViewChild('container0', {static: true, read: ElementRef}) container0!: ElementRef;
  @ViewChild('container', {static: true, read: ViewContainerRef}) container!: ViewContainerRef;
  @ViewChild('container2', {static: true, read: ViewContainerRef}) container2!: ViewContainerRef;
  @ViewChild('template', {static: true, read: TemplateRef}) template!: TemplateRef<any>;

  private element: (HTMLElement & {input: string}) | undefined;
  private currentParcel: Parcel | undefined;
  private injector: Injector = inject(Injector);
  constructor(
    private singleSpaService: SingleSpaService,
    private dynamicElementLoaderService: DynamicElementLoaderService,
    public appSettingsService: AppSettingsService) {
  }

  ngOnInit(): void {
    this.onClick(this.currentActiveApp);
  }

  onElementClick(event: Event) {
    console.log(event);
    this.clickString = (event as CustomEvent<string>).detail;
    if (this.element) {
      this.element.input = this.clickString;
    }
  }

  onClick(appName: string): void {
    this.currentActiveApp = appName;
    if (this.currentActiveApp === 'app1') {
      this.currentActiveTag = 'app-one';
    }
    else {
      this.currentActiveTag = 'app-two';
    }

    //MFE Single SPA Parcel Component
    this.config = toSignal(this.singleSpaService.getMfeParcelConfig(appName), { initialValue: null, injector: this.injector });

    //Manual MFE Parcel Mount
    defer(() =>
      this.currentParcel && this.currentParcel.getStatus() === 'MOUNTED'
        ? this.currentParcel.unmount()
        : of(null)
    )
    .pipe(
      mergeMap(_ => this.singleSpaService.mount(appName, this.container0().nativeElement)),
      catchError(err => of(null))
    )
    .subscribe((parcel: any) => {
      this.currentParcel = parcel;
    });

    //New Dynamic Element Loader Service
    this.element?.remove();
    this.dynamicElementLoaderService
      .loadElement<{input: string}>(
        this.currentActiveApp,
        this.currentActiveTag,
        this.container)
      .subscribe(element => {
        if (element) {
          this.element = element;
          element.input = this.clickString;
          (element as any).addEventListener('customClick', (event: CustomEvent<string>) => {
            this.onElementClick(event);
          });
        }
      });

    //New Dynamic Element Loader Service By Template
    this.dynamicElementLoaderService
      .loadElementByTemplate(
        this.currentActiveApp,
        this.currentActiveTag,
        this.container2,
        this.template)
      .subscribe();
  }
}
