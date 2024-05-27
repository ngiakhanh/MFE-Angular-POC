import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperLazyComponent } from './super-lazy.component';
import { Sandbox } from 'src/app/sandbox';
import { Routes, RouterModule } from '@angular/router';

import { SuperLazy2Component } from './super-lazy2/super-lazy2.component';
import { SuperLazySandbox } from './super-lazy-sandbox';

const routes: Routes = [
  {
    path: '',
    component: SuperLazyComponent
  }
];

@NgModule({
    imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SuperLazyComponent, SuperLazy2Component
],
    providers: [
        {
            provide: Sandbox,
            useExisting: SuperLazySandbox
        }
    ]
})
export class SuperLazyModule { }
