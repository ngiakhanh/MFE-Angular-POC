import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ParcelConfig, mountRootParcel } from 'single-spa';
import { SingleSpaService } from 'src/service/single-spa.service';

@Component({
  selector: 'my-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  title = 'shell';
  currentActiveApp: string = 'app1';
  currentActiveTag: string = 'app-one';
  mountRootParcel = mountRootParcel;
  configObs: Observable<ParcelConfig | null> | undefined = undefined;
  config: WritableSignal<ParcelConfig | null> = signal(null);

  constructor(
    private singleSpaService: SingleSpaService) {
  }

  ngOnInit(): void {
    this.onClick(this.currentActiveApp);
  }

  onClick(appName: string): void {
    this.configObs = this.singleSpaService.getMfeParcelConfig(appName);
    this.currentActiveApp = appName;
    if (this.currentActiveApp === 'app1') {
      this.currentActiveTag = 'app-one';
    }
    else {
      this.currentActiveTag = 'app-two';
    }
  }
}
