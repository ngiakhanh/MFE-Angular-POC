import { Component, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { mountRootParcel, ParcelConfig } from 'single-spa';
import { SingleSpaService } from 'src/service/single-spa.service';

@Component({
  selector: 'my-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mountRootParcel = mountRootParcel;
  config: Signal<ParcelConfig | null> = signal(null);

  constructor(private singleSpaService: SingleSpaService) {
    this.config = toSignal(this.singleSpaService.getMfeParcelConfig('header'), { initialValue: null});
  }
}
