import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N2ngBootstrapComponent } from './n2ng-bootstrap.component';

describe('N2ngBootstrapComponent', () => {
  let component: N2ngBootstrapComponent;
  let fixture: ComponentFixture<N2ngBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ N2ngBootstrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(N2ngBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
