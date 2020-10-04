import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemModuleComponent } from './list-item-module.component';

describe('ListItemModuleComponent', () => {
  let component: ListItemModuleComponent;
  let fixture: ComponentFixture<ListItemModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
