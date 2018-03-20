import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationIframeComponent } from './variation-iframe.component';

describe('VariationIframeComponent', () => {
  let component: VariationIframeComponent;
  let fixture: ComponentFixture<VariationIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
