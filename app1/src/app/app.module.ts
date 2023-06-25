import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { ChildComponent } from './child/child.component';
import { SiblingComponent } from './sibling/sibling.component';
import { Sibling2Component } from './sibling2/sibling2.component';
import { AppElementModule } from './app-element.module';

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
    AppRoutingModule,
    AppElementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector){}
 }
