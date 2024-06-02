import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

//Angular element does not support signals input/output api https://github.com/angular/angular/issues/53981
@Component({
    selector: 'app1-element',
    templateUrl: './app-element.component.html',
    styleUrls: [],
    standalone: true
})
export class AppElementComponent implements OnChanges {
  @Input('input') input = 'No input';
  @Output('customClick') clickEvent = new EventEmitter();

  handleClick = () => {
    this.clickEvent.emit(new Date());
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges trigger from app-element");
  }
}
