import { Component, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { mountRootParcel, ParcelConfig } from 'single-spa';
import { SingleSpaService } from 'src/service/single-spa.service';
import { ParcelComponent } from 'single-spa-angular/parcel';

@Component({
    selector: 'my-app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [ParcelComponent]
})
export class HeaderComponent {
  mountRootParcel = signal(mountRootParcel);
  config: Signal<ParcelConfig | null> = signal(null);

  constructor(private singleSpaService: SingleSpaService) {
    this.config = toSignal(this.singleSpaService.getMfeParcelConfig('header'), { initialValue: null});
  }
}
