import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVariationComponent } from './test-variation.component';

describe('TestVariationComponent', () => {
  let component: TestVariationComponent;
  let fixture: ComponentFixture<TestVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
