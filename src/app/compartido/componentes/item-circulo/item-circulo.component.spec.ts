import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCirculoComponent } from './item-circulo.component';

describe('ItemCirculoComponent', () => {
  let component: ItemCirculoComponent;
  let fixture: ComponentFixture<ItemCirculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCirculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCirculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
