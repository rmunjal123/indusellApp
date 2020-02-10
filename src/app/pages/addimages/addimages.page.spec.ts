import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddimagesPage } from './addimages.page';

describe('AddimagesPage', () => {
  let component: AddimagesPage;
  let fixture: ComponentFixture<AddimagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddimagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddimagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
