import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPerfilComponent } from './album-perfil.component';

describe('AlbumPerfilComponent', () => {
  let component: AlbumPerfilComponent;
  let fixture: ComponentFixture<AlbumPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
