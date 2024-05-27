import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app1-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class ChildComponent implements OnInit {
  ngOnInit(): void {
    console.log('Child component initialized');
  }

}
