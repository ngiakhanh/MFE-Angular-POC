import { LazyComponent } from './lazy.component';
import { LazySandbox } from './lazy-sandbox';
import { Sandbox } from 'src/app/sandbox';

import { Routes } from '@angular/router';

export const lazyRoutes: Routes = [
  {
    path: '',
    component: LazyComponent,
    providers: [
      {
        provide: Sandbox,
        useExisting: LazySandbox
      }
    ],
    children: [{
      path: '',
      pathMatch: 'full',
      loadChildren: () => import('./modules/super-lazy/super-lazy.routes').then((m) => m.superLazyRoutes),
    }]
  }
];
