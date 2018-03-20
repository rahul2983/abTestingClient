import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalIframeComponent } from './original-iframe.component';

describe('OriginalIframeComponent', () => {
  let component: OriginalIframeComponent;
  let fixture: ComponentFixture<OriginalIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginalIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
