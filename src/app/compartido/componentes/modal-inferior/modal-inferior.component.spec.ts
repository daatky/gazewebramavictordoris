import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInferiorComponent } from './modal-inferior.component';

describe('ModalInferiorComponent', () => {
  let component: ModalInferiorComponent;
  let fixture: ComponentFixture<ModalInferiorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInferiorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInferiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
