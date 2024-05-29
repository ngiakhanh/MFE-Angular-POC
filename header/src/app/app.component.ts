import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';

@Component({
    selector: 'header-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
    ,
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase]
})
export class AppComponent {
  title = 'header';
}
