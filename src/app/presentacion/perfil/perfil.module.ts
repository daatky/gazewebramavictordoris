import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { CompartidoModule } from 'src/app/compartido/compartido.module';



@NgModule({
  declarations: [PerfilComponent, VerPerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    CompartidoModule,
  ]
})
export class PerfilModule { }
