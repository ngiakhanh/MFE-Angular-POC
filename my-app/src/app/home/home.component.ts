import { Component, OnInit, WritableSignal, signal } from '@angular/core';
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
  mountRootParcel = mountRootParcel;
  configObs: Observable<ParcelConfig | null> | undefined = undefined;
  config: WritableSignal<ParcelConfig | null> = signal(null);

  constructor(private singleSpaService: SingleSpaService) {

  }

  ngOnInit(): void {
    this.onClick(this.currentActiveApp);
  }

  onClick(appName: string): void {
    this.configObs = this.singleSpaService.getMfeParcelConfig(appName);

    //single-spa-angular still in angular 15
    //this.singleSpaService.getMfeParcelConfig(appName).subscribe(config => this.config.set(config));

    // const unmountIfAny: Observable<null> =
    //   this.currentActiveApp
    //     ? this.singleSpaService.unmount(this.currentActiveApp)
    //     : of(null);
    // unmountIfAny.pipe(
    //   switchMap(_ => {
    //     this.currentActiveApp = appName;
    //     return this.singleSpaService.mount(appName, this.container.nativeElement);
    //   }
    // ))
    // .subscribe();
  }
}
