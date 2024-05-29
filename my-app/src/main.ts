import { enableProdMode, APP_INITIALIZER, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { TestModule } from './app/test.module';
import { LazyElementModule } from './app/lazy-element.module';
import { LazyElementsModule } from '@angular-extensions/elements';
import { ParcelModule } from 'single-spa-angular/parcel';
import { routes } from './app/routes';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MfeRouteHostComponent } from './app/mfe-route-host/mfe-route-host.component';
import { Router, Routes, provideRouter } from '@angular/router';
import { AppSettingsService } from 'src/service/app-settings.service';

if (environment.production) {
  enableProdMode();
}

fetch('/assets/lazy-element-config.json').then(async res => {
  bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule, ParcelModule, LazyElementsModule, LazyElementModule, TestModule),
        {
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
        },
        provideHttpClient(withInterceptorsFromDi()),
        // provideExperimentalZonelessChangeDetection(),
    ]
}).catch(err => console.error(err));
});
