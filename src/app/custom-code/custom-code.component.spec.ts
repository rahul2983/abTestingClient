import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCodeComponent } from './custom-code.component';

describe('CustomCodeComponent', () => {
  let component: CustomCodeComponent;
  let fixture: ComponentFixture<CustomCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
