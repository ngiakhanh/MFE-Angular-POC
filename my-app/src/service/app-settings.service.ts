import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IAppSettings } from 'src/type/app-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private appConfig: IAppSettings | undefined;
  private appConfigMap: Map<string, {url: string, isSingleSpa: boolean}> = new Map<string, {url: string, isSingleSpa: boolean}>();

  constructor(private httpClient: HttpClient) { }

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
            url: this.appConfig.element[mfe],
            isSingleSpa: false
          });
        }
      });
  }

  getMfeUrl(appName: string): string {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfigMap.get(appName)?.url ?? '';
  }
}
