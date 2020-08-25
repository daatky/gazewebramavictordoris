import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensamientoRoutingModule } from "./pensamiento-routing.module";
import { CrearPensamientoComponent } from "./crear-pensamiento/crear-pensamiento.component";
import { PensamientoComponent } from './pensamiento.component';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PensamientoComponent,
    CrearPensamientoComponent,
  ],
  imports: [
    //FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CompartidoModule,

    PensamientoRoutingModule,
  ]
})
export class PensamientoModule { }
