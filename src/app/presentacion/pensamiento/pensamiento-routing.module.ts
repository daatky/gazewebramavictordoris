import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PensamientoComponent } from './pensamiento.component';

const routes: Routes = [
  {
    path: '',
    component: PensamientoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensamientoRoutingModule {

}