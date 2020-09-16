import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { PublicarComponent } from './publicar/publicar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProyectosComponent } from './proyectos.component';


@NgModule({
  declarations: [
    ProyectosComponent,
    PublicarComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule
  ],
  exports: [
    TranslateModule
  ]
})
export class ProyectosModule { }
