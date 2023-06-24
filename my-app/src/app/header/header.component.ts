import { Component } from '@angular/core';
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
  configObs: Observable<ParcelConfig | undefined>;

  constructor(private singleSpaService: SingleSpaService) {
    this.configObs = this.singleSpaService.getMfeParcelConfig('header');
  }
}
