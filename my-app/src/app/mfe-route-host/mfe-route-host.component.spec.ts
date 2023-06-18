import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeRouteHostComponent } from './mfe-route-host.component';

describe('MfeRouteHostComponent', () => {
  let component: MfeRouteHostComponent;
  let fixture: ComponentFixture<MfeRouteHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MfeRouteHostComponent]
    });
    fixture = TestBed.createComponent(MfeRouteHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
