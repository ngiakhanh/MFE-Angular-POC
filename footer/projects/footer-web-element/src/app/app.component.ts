import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styles: [
  ]
})
export class AppComponent {
  currentDateTimeString: string;
  title = 'footer';
  constructor() {
    this.currentDateTimeString = Date();
  }
}
