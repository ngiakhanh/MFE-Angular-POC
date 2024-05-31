import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IAppSettings } from 'src/type/app-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private appConfig: IAppSettings | undefined;
  appConfigMap: Map<string, {url: string, tag?: string, isSingleSpa: boolean}> = new Map();
  private httpClient = inject(HttpClient);

  loadAppConfig() {
    return firstValueFrom(this.httpClient.get<IAppSettings>('/assets/app-settings.json'))
      .then(data => {
        this.appConfig = data;
        for (const mfe in this.appConfig.singleSpa) {
          this.appConfigMap.set(mfe, {
            url: this.appConfig.singleSpa[mfe],
            isSingleSpa: true
          });
        }
        for (const mfe in this.appConfig.element) {
          this.appConfigMap.set(mfe, {
            url: this.appConfig.element[mfe].url,
            tag: this.appConfig.element[mfe].tag,
            isSingleSpa: false
          });
        }
        return this.appConfigMap;
      });
  }

  getMfeUrl(appName: string): string {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfigMap.get(appName)?.url ?? '';
  }
}
