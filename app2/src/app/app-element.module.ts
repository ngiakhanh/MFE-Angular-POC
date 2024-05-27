import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { AppElementComponent } from './app-element.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule,
        AppElementComponent,
    ],
    exports: [AppElementComponent],
    providers: [],
    bootstrap: []
})
export class AppElementModule {
  constructor(private injector: Injector){}

  ngDoBootstrap() {
    if (!customElements.get("app-two")) {
      const element = createCustomElement(AppElementComponent, { injector: this.injector })
      customElements.define("app-two", element);
    }
  }
 }
