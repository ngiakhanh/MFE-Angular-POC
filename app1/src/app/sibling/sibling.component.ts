import { Component } from '@angular/core';

@Component({
    selector: 'app1-sibling',
    templateUrl: './sibling.component.html',
    styleUrls: ['./sibling.component.scss'],
    standalone: true
})
export class SiblingComponent {
  ngOnInit(): void {
    console.log('Child component initialized');
  }
}
