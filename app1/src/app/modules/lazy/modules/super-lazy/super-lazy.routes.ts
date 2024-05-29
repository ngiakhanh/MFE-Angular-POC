import { SuperLazyComponent } from './super-lazy.component';
import { Sandbox } from 'src/app/sandbox';
import { Routes } from '@angular/router';
import { SuperLazySandbox } from './super-lazy-sandbox';

export const superLazyRoutes: Routes = [
  {
    path: '',
    providers: [
      {
          provide: Sandbox,
          useExisting: SuperLazySandbox
      }
    ],
    component: SuperLazyComponent
  }
];
