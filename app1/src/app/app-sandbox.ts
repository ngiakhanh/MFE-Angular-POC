import { Injectable } from '@angular/core';
import { Sandbox } from './sandbox';

@Injectable({providedIn: 'root'})
export class AppSandbox extends Sandbox {
  getName(): string {
    return 'AppSandbox';
  }
}
