import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmainComponent } from './productmain.component';

describe('ProductmainComponent', () => {
  let component: ProductmainComponent;
  let fixture: ComponentFixture<ProductmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
