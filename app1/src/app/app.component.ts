import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, input, output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppElementComponent } from './app-element.component';

@Component({
    selector: 'app1-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, AppElementComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnChanges {
  inputTitle = signal('test');

  handleClick = (event: Date | Event) => {
    console.log(event);
    this.inputTitle.set(new Date() + '');
  }
  title = 'app1';
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges trigger from app1");
  }
}
