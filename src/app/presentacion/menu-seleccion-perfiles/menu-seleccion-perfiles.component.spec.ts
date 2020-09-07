import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSeleccionPerfilesComponent } from './menu-seleccion-perfiles.component';

describe('MenuSeleccionPerfilesComponent', () => {
  let component: MenuSeleccionPerfilesComponent;
  let fixture: ComponentFixture<MenuSeleccionPerfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSeleccionPerfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSeleccionPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
