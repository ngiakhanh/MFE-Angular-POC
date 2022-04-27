import { Injectable } from '@angular/core';
import { Parcel, mountRootParcel,  } from 'single-spa';
import { Observable, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SingleSpaService {
  private loadedParcels: {
    [appName: string]: Parcel
  } = {};

  constructor() { }

  mount(appName: string, domElement: HTMLElement): Observable<null> {
    return !this.loadedParcels[appName]
      ? from(window.System.import(appName))
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
      : of(null) ;
  }
}
