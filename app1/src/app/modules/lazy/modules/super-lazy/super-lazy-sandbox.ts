import { Injectable } from '@angular/core';
import { Sandbox } from 'src/app/sandbox';

@Injectable({providedIn: 'root'})
export class SuperLazySandbox extends Sandbox {
  getName(): string {
    return 'SuperLazySandbox';
  }
}
