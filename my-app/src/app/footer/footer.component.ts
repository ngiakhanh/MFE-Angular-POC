import { Component, WritableSignal, signal } from '@angular/core';
import { AppSettingsService } from 'src/service/app-settings.service';

@Component({
  selector: 'my-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerUrl: WritableSignal<string> = signal('');
  constructor(private appSettingsService: AppSettingsService) {
    this.footerUrl.set(this.appSettingsService.getMfeUrl('footer'));
  }
}
