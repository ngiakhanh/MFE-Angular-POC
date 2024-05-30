import { Injector, NgModule } from '@angular/core';
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
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const element = createCustomElement(AppComponent, { injector: this.injector })
    customElements.define("k-footer", element);
  }
 }
