import { Component, Input } from '@angular/core';

@Component({
    selector: 'app2-element',
    templateUrl: './app-element.component.html',
    styleUrls: ['../styles.scss'] //workaround
    ,
    standalone: true
})
export class AppElementComponent {
  @Input() input: string = '';
  title = 'app2';
}
