import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from '@angular/core';

@Component({
    selector: 'app2-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  inputTitle = signal('');
  title = 'app2';
}
