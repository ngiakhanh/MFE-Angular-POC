import { Component, OnInit } from '@angular/core';
import { Sandbox } from 'src/app/sandbox';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private sandbox: Sandbox) {
    console.log(this.sandbox.getName());
  }

  ngOnInit() {
  }

}
