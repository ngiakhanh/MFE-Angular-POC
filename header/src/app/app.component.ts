import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';

@Component({
    selector: 'header-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', '../styles.scss'] //workaround https://github.com/single-spa/single-spa-angular/issues/471
    ,
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase]
})
export class AppComponent {
  title = 'header';
}
