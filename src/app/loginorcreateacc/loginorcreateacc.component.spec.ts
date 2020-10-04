import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginorcreateaccComponent } from './loginorcreateacc.component';

describe('LoginorcreateaccComponent', () => {
  let component: LoginorcreateaccComponent;
  let fixture: ComponentFixture<LoginorcreateaccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginorcreateaccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginorcreateaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
