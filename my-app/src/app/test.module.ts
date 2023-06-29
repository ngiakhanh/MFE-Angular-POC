import { NgModule } from '@angular/core';
import { LazyElementModule } from './lazy-element.module';

@NgModule({
  declarations: [
   ],
  exports: [

  ],
  imports: [
    LazyElementModule.configure({
      urlToPrefetch: ['http://localhost:4203/main.js']
    })
  ],
})
export class TestModule {
  constructor() {
  }
}
