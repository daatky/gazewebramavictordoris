import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFechaComponent } from './item-fecha.component';

describe('ItemFechaComponent', () => {
  let component: ItemFechaComponent;
  let fixture: ComponentFixture<ItemFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
