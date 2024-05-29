import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestDirective } from '../share/test.directive';
import { Lazy2Component } from './lazy2/lazy2.component';
import { Sandbox } from 'src/app/sandbox';

@Component({
    selector: 'app-lazy',
    templateUrl: './lazy.component.html',
    styleUrls: ['./lazy.component.css'],
    standalone: true,
    imports: [Lazy2Component, TestDirective, RouterOutlet]
})
export class LazyComponent implements OnInit {
  sandbox = inject(Sandbox);
  constructor() { }

  ngOnInit() {
  }

}
