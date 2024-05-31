/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperLazy2Component } from './super-lazy2.component';

describe('SuperLazy2Component', () => {
  let component: SuperLazy2Component;
  let fixture: ComponentFixture<SuperLazy2Component>;

  beforeEach((() => {
    TestBed.configureTestingModule({
    imports: [SuperLazy2Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperLazy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
