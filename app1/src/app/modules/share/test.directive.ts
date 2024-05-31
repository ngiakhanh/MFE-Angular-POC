import { Directive, inject } from '@angular/core';
import { Sandbox } from 'src/app/sandbox';

@Directive({
    selector: '[appTest]',
    standalone: true,
})
export class TestDirective {
  private sandbox = inject(Sandbox);
  constructor() {
    console.log(this.sandbox.getName());
  }
}
