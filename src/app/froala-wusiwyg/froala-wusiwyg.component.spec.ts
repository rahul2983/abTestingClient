import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FroalaWusiwygComponent } from './froala-wusiwyg.component';

describe('FroalaWusiwygComponent', () => {
  let component: FroalaWusiwygComponent;
  let fixture: ComponentFixture<FroalaWusiwygComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FroalaWusiwygComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FroalaWusiwygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
