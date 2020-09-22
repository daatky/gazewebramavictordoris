import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component'
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
    children:[
      {
        path:'',
        component:VerPerfilComponent,
        pathMatch:'full'
      },
      {
        path:':id',
        component:VerPerfilComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule {

}