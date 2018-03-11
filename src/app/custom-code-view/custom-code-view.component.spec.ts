import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCodeViewComponent } from './custom-code-view.component';

describe('CustomCodeViewComponent', () => {
  let component: CustomCodeViewComponent;
  let fixture: ComponentFixture<CustomCodeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCodeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
