import { Lazy2Component } from './lazy2/lazy2.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';
import { LazySandbox } from './lazy-sandbox';
import { Sandbox } from 'src/app/sandbox';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LazyComponent,
    children: [{
      path: '',
      pathMatch: 'full',
      loadChildren: () => import('./modules/super-lazy/super-lazy.module').then((m) => m.SuperLazyModule),
    }]
  }
];

@NgModule({
    imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LazyComponent, Lazy2Component
],
    providers: [
        {
            provide: Sandbox,
            useExisting: LazySandbox
        }
    ]
})
export class LazyModule { }
