import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app1-element',
    templateUrl: './app-element.component.html',
    styleUrls: ['../styles.scss'] //workaround
    ,
    standalone: true
})
export class AppElementComponent implements OnChanges {
  @Input() input: string = 'No input';
  @Output('customClick') clickEvent = new EventEmitter();

  handleClick = () => {
    this.clickEvent.emit(new Date());
  }
  title = 'app1';
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges trigger from app-element");
  }
}
