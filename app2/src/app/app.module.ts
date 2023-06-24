import { Injector, NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector, private app: ApplicationRef){}

  ngDoBootstrap(){
    if (!customElements.get("app-two")) {
      const element = createCustomElement(AppComponent, { injector: this.injector })
      customElements.define("app-two", element);
    }

    this.app.bootstrap(AppComponent);
  }
 }
