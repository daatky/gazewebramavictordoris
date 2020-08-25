import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPensamientoComponent } from './item-pensamiento.component';

describe('ItemPensamientoComponent', () => {
  let component: ItemPensamientoComponent;
  let fixture: ComponentFixture<ItemPensamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPensamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPensamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
