import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styles: [],
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase]
})
export class AppComponent {
  currentDateTimeString: string;
  title = 'footer';
  constructor() {
    this.currentDateTimeString = Date();
  }
}
