import { ProyectosComponent } from './proyectos.component';
import { RutasProyectos } from './rutas-proyectos.enum';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicarComponent } from './publicar/publicar.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectosComponent,
    children: [
      {
        path: RutasProyectos.PUBLICAR.toString(),
        component: PublicarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule {
  
}
