import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensamientoCompartidoComponent } from './pensamiento-compartido.component';

describe('PensamientoComponent', () => {
  let component: PensamientoCompartidoComponent;
  let fixture: ComponentFixture<PensamientoCompartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensamientoCompartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensamientoCompartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
