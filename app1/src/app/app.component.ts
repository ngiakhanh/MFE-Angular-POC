import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'] //workaround
})
export class AppComponent {
  @Input() input: string = 'No input';
  @Output('customClick') clickEvent = new EventEmitter();

  @HostListener('click')
  handleClick = () => {
    this.clickEvent.emit('new click' + new Date());
  }
  title = 'app1';
}
