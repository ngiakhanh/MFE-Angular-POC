import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, signal } from '@angular/core';

//angular element does not support signal api
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styles: [],
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase]
})
export class AppComponent {
  title = signal('footer');
}
