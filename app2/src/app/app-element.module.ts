import { ApplicationRef, Injector, NgModule, inject } from '@angular/core';
import { AppComponent } from './app.component';
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
  private _injector = inject(Injector);

  ngDoBootstrap() {
    if (!customElements.get("app-two")) {
      const element = createCustomElement(AppElementComponent, { injector: this._injector })
      customElements.define("app-two", element);
    }
  }
 }
