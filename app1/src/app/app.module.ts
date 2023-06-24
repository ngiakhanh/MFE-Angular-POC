import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { ChildComponent } from './child/child.component';
import { SiblingComponent } from './sibling/sibling.component';
import { Sibling2Component } from './sibling2/sibling2.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    ChildComponent,
    SiblingComponent,
    Sibling2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const element = createCustomElement(AppComponent, { injector: this.injector })
    customElements.define("app-one", element);
  }
 }
