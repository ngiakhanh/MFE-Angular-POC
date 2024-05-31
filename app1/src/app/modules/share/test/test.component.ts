import { Component, OnInit, inject } from '@angular/core';
import { Sandbox } from 'src/app/sandbox';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
    standalone: true
})
export class TestComponent {
  private sandbox = inject(Sandbox);
  constructor() {
    console.log(this.sandbox.getName());
  }
}
