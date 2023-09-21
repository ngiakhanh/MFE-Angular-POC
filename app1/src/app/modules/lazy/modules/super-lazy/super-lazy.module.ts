import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperLazyComponent } from './super-lazy.component';
import { Sandbox } from 'src/app/sandbox';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/modules/share/share.module';
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
    ShareModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    {
      provide: Sandbox,
      useExisting: SuperLazySandbox
    }
  ],
  declarations: [SuperLazyComponent, SuperLazy2Component]
})
export class SuperLazyModule { }
