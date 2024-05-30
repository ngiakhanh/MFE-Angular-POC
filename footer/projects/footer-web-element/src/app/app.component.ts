import { Component, signal } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
  currentDateTimeString = Date();
  title = signal('footer');
}
