import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppElementComponent } from './app-element.component';
import { BrowserModule } from '@angular/platform-browser';

//angular element does not support standalone
@NgModule({
  declarations: [
    AppElementComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [AppElementComponent],
  providers: [],
  bootstrap: []
})
export class AppElementModule {
  constructor(private injector: Injector){}

  ngDoBootstrap() {
    if (!customElements.get("app-one")) {
      const element = createCustomElement(AppElementComponent, { injector: this.injector })
      customElements.define("app-one", element);
    }
  }
 }
