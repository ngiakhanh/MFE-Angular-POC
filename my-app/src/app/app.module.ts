import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParcelModule } from 'single-spa-angular/parcel';
import { AppSettingsService } from 'src/service/app-settings.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Router, Routes } from '@angular/router';
import { MfeRouteHostComponent } from './mfe-route-host/mfe-route-host.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LazyElementModule } from './lazy-element.module';
import { LazyElementsModule } from '@angular-extensions/elements';
import { TestModule } from './test.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MfeRouteHostComponent,
    HomeComponent,
    NotFoundComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParcelModule,
    HttpClientModule,
    LazyElementsModule,
    LazyElementModule,
    TestModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppSettingsService, Router],
    useFactory: (appSettingsService: AppSettingsService, router: Router) => {
      return async () => {
        const config = await appSettingsService.loadAppConfig();
        const routes: Routes = Array.from(config, ([key, value]) => ({ key, value })).map(route => {
          return {
            path: route.key,
            data: {
              mfeName: route.key,
              isSingleSpa: route.value.isSingleSpa,
              tag: route.value.tag,
              url: route.value.url
            },
            children: [
              {
                path: '**',
                component: MfeRouteHostComponent
              }
            ]
          };
        });
        router.resetConfig([...routes, ...router.config]);
      };
    }
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
