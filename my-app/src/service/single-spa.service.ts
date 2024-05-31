import { Injectable, inject } from '@angular/core';
import { Parcel, ParcelConfig, mountRootParcel, CustomProps } from 'single-spa';
import { Observable, defer, from, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SingleSpaService {
  private loadedParcels: {
    [appName: string]: ParcelConfig | undefined;
  } = {};
  private loadedParcelsByUrl: {
    [url: string]: ParcelConfig | undefined;
  } = {};

  private appSettingsService = inject(AppSettingsService);

  fetchParcelConfig(url: string): Observable<ParcelConfig> {
    return !this.loadedParcelsByUrl[url]
      ? from(window.System.import(url))
        .pipe(
          map(app => {
            this.loadedParcelsByUrl[url] = app;
            return app;
          }))
      : of(this.loadedParcelsByUrl[url]!);
  }

  mountByUrl(url: string, domElement: HTMLElement, customProps: CustomProps={}): Observable<Parcel | undefined> {
    return !this.loadedParcelsByUrl[url]
      ? from(window.System.import(url))
        .pipe(
          mergeMap(app => {
            this.loadedParcelsByUrl[url] = app;
            const parcel = mountRootParcel(app, {...customProps, domElement });
            return parcel.mountPromise.then(_ => parcel);
          }))
      : defer(() => {
        const parcel = mountRootParcel(this.loadedParcelsByUrl[url]!, {...customProps, domElement });
        return parcel.mountPromise.then(_ => parcel);
      });
  }

  mount(appName: string, domElement: HTMLElement, customProps: CustomProps={}): Observable<Parcel | undefined> {
    return !this.loadedParcels[appName]
      ? from(window.System.import(this.appSettingsService.getMfeUrl(appName)))
        .pipe(
          mergeMap(app => {
            this.loadedParcels[appName] = app;
            const parcel = mountRootParcel(app, {...customProps, domElement });
            return parcel.mountPromise.then(_ => parcel);
          }))
      : defer(() => {
        const parcel = mountRootParcel(this.loadedParcels[appName]!, {...customProps, domElement });
        return parcel.mountPromise.then(_ => parcel);
      });
  }

  getMfeParcelConfig(appName: string): Observable<ParcelConfig | null> {
    return this.loadedParcels[appName] != null
      ? of(this.loadedParcels[appName] as ParcelConfig)
      : from(window.System.import(this.appSettingsService.getMfeUrl(appName)))
          .pipe(
            tap(app => this.loadedParcels[appName] = app),
            catchError(err => of(null)));
  }
}
