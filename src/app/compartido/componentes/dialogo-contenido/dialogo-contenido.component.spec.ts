import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoContenidoComponent } from './dialogo-contenido.component';

describe('DialogoContenidoComponent', () => {
  let component: DialogoContenidoComponent;
  let fixture: ComponentFixture<DialogoContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
