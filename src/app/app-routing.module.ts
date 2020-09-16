import { LandingPageComponent } from './presentacion/landing-page/landing-page.component'
import { AlbumPerfilComponent } from './presentacion/album-perfil/album-perfil.component'
import { AlbumGeneralComponent } from './presentacion/album-general/album-general.component'
import { MetodoPagoComponent } from './presentacion/metodo-pago/metodo-pago.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './presentacion/login/login.component'
import { RegistroComponent } from './presentacion/registro/registro.component'
import { MenuPerfilesComponent } from './presentacion/menu-perfiles/menu-perfiles.component'
import { BienvenidaComponent } from './presentacion/bienvenida/bienvenida.component'
import { RutasLocales } from './rutas-locales.enum'
import { MenuPrincipalComponent } from './presentacion/menu-principal/menu-principal.component';
import { MisContactosComponent } from './presentacion/mis-contactos/mis-contactos.component';
import { MenuSeleccionPerfilesComponent } from './presentacion/menu-seleccion-perfiles/menu-seleccion-perfiles.component';
import { RestriccionRutas } from "../app/nucleo/servicios/generales/canActivate/resticcionRutas.service";
import { RutasInicioSession } from './nucleo/servicios/generales/canActivate/rutas-inicio-session.service';
import { BuscadorComponent } from './compartido/componentes/buscador/buscador.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [RutasInicioSession]
  },
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: RutasLocales.METODO_PAGO.toString(),
    component: MetodoPagoComponent,
  },
  {
    path: RutasLocales.REGISTRO.toString(),
    component: RegistroComponent
  },
  {
    path: RutasLocales.MENU_PERFILES.toString(),
    component: MenuPerfilesComponent
  },
  {
    path: RutasLocales.BIENVENIDO.toString(),
    component: BienvenidaComponent,
    canActivate: [RutasInicioSession]
  },
  {
    path: RutasLocales.ALBUM_PERFIL.toString(),
    component: AlbumPerfilComponent
  },
  {
    path: RutasLocales.ALBUM_GENERAL.toString(),
    component: AlbumGeneralComponent
  },
  {
    path: RutasLocales.ALBUM_PERFIL.toString(),
    component: AlbumPerfilComponent
  },
  {
    path: RutasLocales.MENU_PRINCIPAL.toString(),
    component: MenuPrincipalComponent
  },
  {
    path: RutasLocales.MODULO_PENSAMIENTO.toString(),
    loadChildren: () =>
      import('./presentacion/pensamiento/pensamiento.module').then(p => p.PensamientoModule),
    canActivate: [RestriccionRutas]
  },
  {
    path: RutasLocales.PERFIL.toString(),
    loadChildren: () =>
      import('./presentacion/perfil/perfil.module').then(p => p.PerfilModule),
    canActivate: [RestriccionRutas]
  },
  {
    path: RutasLocales.MIS_CONTACTOS.toString(),
    component: MisContactosComponent
  },
  {
    path: RutasLocales.MENU_SELECCION_PERFILES.toString(),
    component: MenuSeleccionPerfilesComponent,
    canActivate: [RestriccionRutas]
  }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}