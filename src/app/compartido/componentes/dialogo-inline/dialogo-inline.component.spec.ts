import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoInlineComponent } from './dialogo-inline.component';

describe('DialogoInlineComponent', () => {
  let component: DialogoInlineComponent;
  let fixture: ComponentFixture<DialogoInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
