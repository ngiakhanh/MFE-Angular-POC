import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, signal } from '@angular/core';

@Component({
    selector: 'app2-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', '../styles.scss'], //workaround
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  inputTitle = signal('');
  title = 'app2';
}
