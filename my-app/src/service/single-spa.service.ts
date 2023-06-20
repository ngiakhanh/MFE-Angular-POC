import { Injectable } from '@angular/core';
import { Parcel, ParcelConfig, mountRootParcel,  } from 'single-spa';
import { Observable, from, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SingleSpaService {
  private loadedParcels: {
    [appName: string]: Parcel
  } = {};

  constructor(private appSettingsService: AppSettingsService) { }

  mount(appName: string, domElement: HTMLElement): Observable<null> {
    return !this.loadedParcels[appName]
      ? from(window.System.import(this.appSettingsService.getMfeUrl(appName)))
        .pipe(
          tap(app => this.loadedParcels[appName] = mountRootParcel(app, { domElement })),
          map(_ => null))
      : of(null);
  }

  unmount(appName: string): Observable<null> {
    return this.loadedParcels[appName]
      ? from(this.loadedParcels[appName].unmount())
        .pipe(
          tap(() => delete this.loadedParcels[appName]),
          map(_ => null))
      : of(null);
  }

  getMfeParcelConfig(appName: string): Observable<ParcelConfig | null> {
    return from(window.System.import(this.appSettingsService.getMfeUrl(appName))).pipe(catchError(err => of(null)));
  }
}
