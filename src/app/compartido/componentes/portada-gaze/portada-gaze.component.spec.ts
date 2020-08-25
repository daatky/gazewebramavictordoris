import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadaGazeComponent } from './portada-gaze.component';

describe('PortadaGazeComponent', () => {
  let component: PortadaGazeComponent;
  let fixture: ComponentFixture<PortadaGazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortadaGazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortadaGazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
