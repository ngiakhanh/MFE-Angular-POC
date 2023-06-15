import { Component } from '@angular/core';

@Component({
  selector: 'app1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'] //workaround
})
export class AppComponent {
  title = 'app1';
}
