import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatereviewPage } from './createreview.page';

describe('CreatereviewPage', () => {
  let component: CreatereviewPage;
  let fixture: ComponentFixture<CreatereviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatereviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatereviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
