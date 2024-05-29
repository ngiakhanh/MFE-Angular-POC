import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { ChildComponent } from './child/child.component';
import { SiblingComponent } from './sibling/sibling.component';
import { Sibling2Component } from './sibling2/sibling2.component';
import { LazyComponent } from './modules/lazy/lazy.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./modules/lazy/lazy.routes').then((m) => m.lazyRoutes),
  },
  {
    path: 'app1',
    component: ChildComponent,
    children: [
      {
        path: 'sibling',
        component: SiblingComponent,
      },
      {
        path: 'sibling2',
        component: Sibling2Component,
      }
    ]
  },
  { path: '**', component: EmptyRouteComponent }
];
