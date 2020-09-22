import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionUtilComponent } from './informacion-util.component';

describe('InformacionUtilComponent', () => {
  let component: InformacionUtilComponent;
  let fixture: ComponentFixture<InformacionUtilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionUtilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
