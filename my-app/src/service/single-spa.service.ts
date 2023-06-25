import { Injectable } from '@angular/core';
import { Parcel, ParcelConfig, mountRootParcel, CustomProps } from 'single-spa';
import { Observable, defer, from, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SingleSpaService {
  private loadedParcels: {
    [appName: string]: ParcelConfig | undefined;
  } = {};

  constructor(private appSettingsService: AppSettingsService) { }

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

  getMfeParcelConfig(appName: string): Observable<ParcelConfig | undefined> {
    return this.loadedParcels[appName] != null
      ? of(this.loadedParcels[appName] as ParcelConfig)
      : from(window.System.import(this.appSettingsService.getMfeUrl(appName)))
          .pipe(
            tap(app => this.loadedParcels[appName] = app),
            catchError(err => of(undefined)));
  }
}
