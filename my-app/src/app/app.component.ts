import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { SingleSpaService } from 'src/service/single-spa.service';
import '@ngiakhanh96/footer';

@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';
  currentActiveApp: string = 'app1';
  @ViewChild('container', {static: true}) private container!: ElementRef;

  constructor(private service: SingleSpaService) {

  }

  ngOnInit(): void {
    this.onClick(this.currentActiveApp);
  }

  ngOnDestroy() {
    if (this.currentActiveApp) {
      this.service.unmount(this.currentActiveApp);
    }
  }

  onClick(appName: string): void {
    const unmountIfAny: Observable<null> =
      this.currentActiveApp
        ? this.service.unmount(this.currentActiveApp)
        : of(null);
    unmountIfAny.pipe(
      switchMap(_ => {
        this.currentActiveApp = appName;
        return this.service.mount(appName, this.container.nativeElement);
      }
    ))
    .subscribe();
  }
}
