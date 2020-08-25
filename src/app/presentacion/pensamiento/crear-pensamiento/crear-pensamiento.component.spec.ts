import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPensamientoComponent } from './crear-pensamiento.component';

describe('CrearPensamientoComponent', () => {
  let component: CrearPensamientoComponent;
  let fixture: ComponentFixture<CrearPensamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPensamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPensamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
