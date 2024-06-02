import { Component, Input } from '@angular/core';

//Angular element does not support signals input/output api https://github.com/angular/angular/issues/53981
@Component({
    selector: 'app2-element',
    templateUrl: './app-element.component.html',
    styleUrls: [],
    standalone: true
})
export class AppElementComponent {
  @Input() input: string = '';
  title = 'app2';
}
