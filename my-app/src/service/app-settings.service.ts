import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IAppSettings } from 'src/type/app-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private appConfig: IAppSettings | undefined;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return firstValueFrom(this.http.get<IAppSettings>('/assets/app-settings.json'))
      .then(data => {
        this.appConfig = data;
      });
  }

  getMfeUrl(appName: string): string {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.urlMap[appName];
  }
}
