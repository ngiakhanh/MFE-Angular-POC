import { CUSTOM_ELEMENTS_SCHEMA, Component, WritableSignal, signal } from '@angular/core';
import { AppSettingsService } from 'src/service/app-settings.service';
import { LazyElementsModule } from '@angular-extensions/elements';

@Component({
    selector: 'my-app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [LazyElementsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterComponent {
  footerUrl: WritableSignal<string> = signal('');
  constructor(private appSettingsService: AppSettingsService) {
    this.footerUrl.set(this.appSettingsService.getMfeUrl('footer'));
  }
}
