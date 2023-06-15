import { Component } from '@angular/core';

@Component({
  selector: 'header-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'] //workaround https://github.com/single-spa/single-spa-angular/issues/471
})
export class AppComponent {
  title = 'header';
}
