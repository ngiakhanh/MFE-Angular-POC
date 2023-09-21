import { Directive } from '@angular/core';
import { Sandbox } from 'src/app/sandbox';

@Directive({
  selector: '[appTest]',
})
export class TestDirective {
  constructor(private sandbox: Sandbox) {
    console.log(this.sandbox.getName());
  }
}
