import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSeleccionarProyectosComponent } from './menu-seleccionar-proyectos.component';

describe('MenuSeleccionarProyectosComponent', () => {
  let component: MenuSeleccionarProyectosComponent;
  let fixture: ComponentFixture<MenuSeleccionarProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSeleccionarProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSeleccionarProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
