import { AfterViewChecked, CUSTOM_ELEMENTS_SCHEMA, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, tap } from 'rxjs';
import { ParcelConfig, mountRootParcel } from 'single-spa';
import { SingleSpaService } from 'src/service/single-spa.service';
import { LazyElementsModule } from '@angular-extensions/elements';
import { ParcelComponent } from 'single-spa-angular/parcel';

@Component({
    selector: 'my-app-mfe-route-host',
    templateUrl: './mfe-route-host.component.html',
    styleUrls: ['./mfe-route-host.component.scss'],
    standalone: true,
    imports: [ParcelComponent, LazyElementsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MfeRouteHostComponent implements AfterViewChecked {
  mountRootParcel = signal(mountRootParcel);
  config = signal<ParcelConfig | null>(null);
  isSingleSpa = signal<boolean | undefined>(undefined);
  tag = signal<string | null>(null);
  url = signal<string | null>(null);
  constructor(private route: ActivatedRoute, private singleSpaService: SingleSpaService, private router: Router) {
    this.route.data.pipe(
      switchMap(
        (data: any) => {
          if (data['isSingleSpa']) {
            this.isSingleSpa.set(true);
            return this.singleSpaService.getMfeParcelConfig(data['mfeName']).pipe(
              tap(value => {
                if (!value) {
                  setTimeout(() => this.router.navigate(['notfound']));
                }
                else {
                  this.config.set(value);
                }
              }));
          }
          this.isSingleSpa.set(false);
          this.tag.set(data['tag']);
          this.url.set(data['url']);
          return of(null);
        }),
      takeUntilDestroyed(),
    )
    .subscribe();
  }

  ngAfterViewChecked(): void {
    if (document.querySelectorAll('mfe-page-not-found').length > 0) {
      setTimeout(() => this.router.navigate(['notfound']));
    }
  }
}
