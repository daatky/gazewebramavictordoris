import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCircularComponent } from './item-circular.component';

describe('ItemCircularComponent', () => {
  let component: ItemCircularComponent;
  let fixture: ComponentFixture<ItemCircularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCircularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
