import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPublicarProyectosComponent } from './menu-publicar-proyectos.component';

describe('MenuPublicarProyectosComponent', () => {
  let component: MenuPublicarProyectosComponent;
  let fixture: ComponentFixture<MenuPublicarProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPublicarProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPublicarProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
