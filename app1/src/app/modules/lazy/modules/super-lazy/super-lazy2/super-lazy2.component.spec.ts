/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SuperLazy2Component } from './super-lazy2.component';

describe('SuperLazy2Component', () => {
  let component: SuperLazy2Component;
  let fixture: ComponentFixture<SuperLazy2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperLazy2Component ]
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
