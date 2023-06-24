import { Component, Input } from '@angular/core';

@Component({
  selector: 'app2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'] //workaround
})
export class AppComponent {
  @Input() input: string = '';
  title = 'app2';
}
