import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PensamientoComponent } from './pensamiento.component';

const routes: Routes = [
  {
    path: '',
    component: PensamientoComponent,
    /*children: [
      {
        path: RutasLocales.CREAR_PENSAMIENTO.toString(),
       // redirectTo: 'm1v6',
     //   pathMatch: 'full'
        component:CrearPensamientoComponent
      },
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensamientoRoutingModule {

}