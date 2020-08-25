import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraIdiomasComponent } from './cabecera-idiomas.component';

describe('CabeceraIdiomasComponent', () => {
  let component: CabeceraIdiomasComponent;
  let fixture: ComponentFixture<CabeceraIdiomasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraIdiomasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
