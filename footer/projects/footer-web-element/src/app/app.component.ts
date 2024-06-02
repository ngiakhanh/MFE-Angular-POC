import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, signal } from '@angular/core';

//Angular element does not support signals input/output api https://github.com/angular/angular/issues/53981
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
