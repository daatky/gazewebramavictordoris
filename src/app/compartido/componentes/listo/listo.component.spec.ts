import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoComponent } from './listo.component';

describe('ListoComponent', () => {
  let component: ListoComponent;
  let fixture: ComponentFixture<ListoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
