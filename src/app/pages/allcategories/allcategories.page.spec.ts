import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcategoriesPage } from './allcategories.page';

describe('AllcategoriesPage', () => {
  let component: AllcategoriesPage;
  let fixture: ComponentFixture<AllcategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcategoriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
