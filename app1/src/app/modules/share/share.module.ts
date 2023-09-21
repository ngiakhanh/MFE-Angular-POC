import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDirective } from './test.directive';
import { TestComponent } from './test/test.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TestDirective, TestComponent],
  exports: [TestDirective, TestComponent]
})
export class ShareModule { }
