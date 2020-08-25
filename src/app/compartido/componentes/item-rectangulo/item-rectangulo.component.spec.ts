import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRectanguloComponent } from './item-rectangulo.component';

describe('ItemRectanguloComponent', () => {
  let component: ItemRectanguloComponent;
  let fixture: ComponentFixture<ItemRectanguloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRectanguloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRectanguloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
