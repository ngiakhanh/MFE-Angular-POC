import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParcelModule } from 'single-spa-angular/parcel';
import { AppSettingsService } from 'src/service/app-settings.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParcelModule,
    HttpClientModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppSettingsService],
    useFactory: (appSettingsService: AppSettingsService) => {
      return () => {
        //Make sure to return a promise!
        return appSettingsService.loadAppConfig();
      };
    }
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
