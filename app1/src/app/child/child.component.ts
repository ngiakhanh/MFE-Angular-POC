import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app1-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  ngOnInit(): void {
    console.log('Child component initialized');
  }

}
