import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  template: `
    <p>
      Footer works! {{currentDateTimeString}}
    </p>
  `,
  styles: [
  ]
})
export class AppComponent {
  currentDateTimeString: string;

  constructor() {
    this.currentDateTimeString = Date();
  }
}
