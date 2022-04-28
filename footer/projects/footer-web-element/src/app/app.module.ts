import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsComponent, ComponentsModule } from 'projects/components/src/public-api';

@NgModule({
  imports: [
    BrowserModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const element = createCustomElement(ComponentsComponent, { injector: this.injector })
    customElements.define("k-footer", element);
  }
 }
