import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumGeneralComponent } from './album-general.component';

describe('AlbumGeneralComponent', () => {
  let component: AlbumGeneralComponent;
  let fixture: ComponentFixture<AlbumGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
