import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'] //workaround
})
export class AppComponent implements OnChanges {
  @Input() input: string = 'No input';
  @Output('customClick') clickEvent = new EventEmitter();

  @HostListener('click')
  handleClick = () => {
    this.clickEvent.emit(new Date());
  }
  title = 'app1';
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges trigger from app1");
  }
}
