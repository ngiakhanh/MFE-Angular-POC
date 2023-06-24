import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, WritableSignal, signal } from '@angular/core';
import { Observable, defer, mergeMap, of } from 'rxjs';
import { ParcelConfig, mountRootParcel } from 'single-spa';
import { SingleSpaService } from 'src/service/single-spa.service';
import { DynamicElementLoaderService } from '../dynamic-element-loader.service';
import { NgElement, WithProperties } from '@angular/elements';
import { Parcel } from 'single-spa';

@Component({
  selector: 'my-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  title = 'shell';
  currentActiveApp: string = 'app1';
  currentActiveTag: string = 'app-one';
  mountRootParcel = mountRootParcel;
  configObs: Observable<ParcelConfig | undefined> | undefined = undefined;
  config: WritableSignal<ParcelConfig | null> = signal(null);
  clickString: string = '';

  @ViewChild('container0', {static: true, read: ElementRef}) container0!: ElementRef;
  @ViewChild('container', {static: true, read: ViewContainerRef}) container!: ViewContainerRef;
  @ViewChild('container2', {static: true, read: ViewContainerRef}) container2!: ViewContainerRef;
  @ViewChild('template', {static: true, read: TemplateRef}) template!: TemplateRef<any>;

  private element: NgElement & WithProperties<{input: string}> | undefined;
  private currentParcel: Parcel | undefined;
  constructor(
    private singleSpaService: SingleSpaService,
    private dynamicElementLoaderService: DynamicElementLoaderService) {
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

    //
    this.configObs = this.singleSpaService.getMfeParcelConfig(appName);

    //
    defer(() =>
      this.currentParcel && this.currentParcel.getStatus() === 'MOUNTED'
        ? this.currentParcel.unmount()
        : of(null)
    )
      .pipe(mergeMap(_ => this.singleSpaService.mount(appName, this.container0.nativeElement)))
      .subscribe(parcel => {
        this.currentParcel = parcel;
      });

    //
    this.element?.remove();
    this.dynamicElementLoaderService
      .loadElement<{input: string}>(
        this.currentActiveApp,
        this.currentActiveTag,
        this.container,
        (element) => {
          element.input = this.clickString;
          element.addEventListener('customClick', (event) => {
            this.onElementClick(event);
            element.input = this.clickString;
          });
        })
      .subscribe(element => this.element = element);

    //
    this.dynamicElementLoaderService
      .loadElementByTemplate(
        this.currentActiveApp,
        this.currentActiveTag,
        this.container2,
        this.template)
      .subscribe();
  }
}
