import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVerticalDosComponent } from './lista-vertical-dos.component';

describe('ListaVerticalDosComponent', () => {
  let component: ListaVerticalDosComponent;
  let fixture: ComponentFixture<ListaVerticalDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVerticalDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVerticalDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
