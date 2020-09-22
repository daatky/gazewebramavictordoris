import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemContactoComponent } from './item-contacto.component';

describe('ItemContactoComponent', () => {
  let component: ItemContactoComponent;
  let fixture: ComponentFixture<ItemContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemContactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
