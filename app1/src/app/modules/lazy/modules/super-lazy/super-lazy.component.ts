import { Component, OnInit } from '@angular/core';
import { TestDirective } from '../../../share/test.directive';
import { SuperLazy2Component } from './super-lazy2/super-lazy2.component';

@Component({
    selector: 'app-super-lazy',
    templateUrl: './super-lazy.component.html',
    styleUrls: ['./super-lazy.component.css'],
    standalone: true,
    imports: [SuperLazy2Component, TestDirective]
})
export class SuperLazyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
