import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { ChildComponent } from './child/child.component';
import { SiblingComponent } from './sibling/sibling.component';
import { Sibling2Component } from './sibling2/sibling2.component';
import { Sandbox } from './sandbox';
import { AppSandbox } from './app-sandbox';
import { ShareModule } from './modules/share/share.module';

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
    ShareModule
  ],
  providers: [{
    provide: Sandbox,
    useExisting: AppSandbox
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
