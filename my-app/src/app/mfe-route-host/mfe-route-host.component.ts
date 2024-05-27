import { AfterViewChecked, Component } from '@angular/core';
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
    imports: [ParcelComponent, LazyElementsModule]
})
export class MfeRouteHostComponent implements AfterViewChecked {
  mountRootParcel = mountRootParcel;
  config: ParcelConfig | null = null;
  isSingleSpa: boolean | undefined;
  tag: string | null = null;
  url: string | null = null;
  constructor(private route: ActivatedRoute, private singleSpaService: SingleSpaService, private router: Router) {
    this.route.data.pipe(
      takeUntilDestroyed(),
      switchMap(
        (data: any) => {
          if (data['isSingleSpa']) {
            this.isSingleSpa = true;
            return this.singleSpaService.getMfeParcelConfig(data['mfeName']).pipe(
              tap(value => {
                if (!value) {
                  setTimeout(() => this.router.navigate(['notfound']));
                }
                else {
                  this.config = value;
                }
              }));
          }
          this.isSingleSpa = false;
          this.tag = data['tag'];
          this.url = data['url'];
          return of(null);
        })
    ).subscribe();
  }

  ngAfterViewChecked(): void {
    if (document.querySelectorAll('mfe-page-not-found').length > 0) {
      setTimeout(() => this.router.navigate(['notfound']));
    }
  }
}
