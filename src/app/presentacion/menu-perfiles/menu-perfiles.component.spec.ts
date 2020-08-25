import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPerfilesComponent } from './menu-perfiles.component';

describe('MenuPerfilesComponent', () => {
  let component: MenuPerfilesComponent;
  let fixture: ComponentFixture<MenuPerfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPerfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
