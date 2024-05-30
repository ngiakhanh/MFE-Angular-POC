import { Injector, NgModule, inject } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

//angular element does not support standalone
@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule
    ],
    providers: [],
    bootstrap: [],
})
export class AppModule {
  private _injector = inject(Injector);

  ngDoBootstrap(){
    const element = createCustomElement(AppComponent, { injector: this._injector })
    customElements.define("k-footer", element);
  }
 }
