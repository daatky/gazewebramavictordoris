//MODULOS
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { WebcamModule } from 'ngx-webcam';
import { ImageCropperModule } from 'ngx-image-cropper';

import { NgxStripeModule } from 'ngx-stripe';
import { NgxPayPalModule } from 'ngx-paypal';

import { CompartidoModule } from './compartido/compartido.module'
import { DetectorGestos } from './nucleo/servicios/generales/detector-gestos.service'

//=====Modulos traducciones
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

//SERVICIOS
//import { ApiService } from './nucleo/servicios/locales/api'
import { HandleError } from './nucleo/servicios/locales/handleError.service'
import { IdiomaService } from './nucleo/servicios/remotos/idioma.service'


//DIRECTIVAS
//COMPONENTES
import { AppComponent } from './app.component';

//Test
import { LoginComponent } from './presentacion/login/login.component';
import { RegistroComponent } from './presentacion/registro/registro.component';
import { MetodoPagoComponent } from './presentacion/metodo-pago/metodo-pago.component'
import { PeticionInterceptor } from './nucleo/servicios/remotos/peticion.interceptor';
import { MenuPerfilesComponent } from './presentacion/menu-perfiles/menu-perfiles.component';
import { AlbumPerfilComponent } from './presentacion/album-perfil/album-perfil.component';
import { BienvenidaComponent } from './presentacion/bienvenida/bienvenida.component';
import { LandingPageComponent } from './presentacion/landing-page/landing-page.component';
import { AlbumGeneralComponent } from './presentacion/album-general/album-general.component';
import { MenuPrincipalComponent } from './presentacion/menu-principal/menu-principal.component';
import { MisContactosComponent } from './presentacion/mis-contactos/mis-contactos.component';
import { MenuSeleccionPerfilesComponent } from './presentacion/menu-seleccion-perfiles/menu-seleccion-perfiles.component';
import { RestriccionRutas } from './nucleo/servicios/generales/canActivate/resticcionRutas.service';
import { RutasInicioSession } from './nucleo/servicios/generales/canActivate/rutas-inicio-session.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

//Traducciones
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MetodoPagoComponent,
    MenuPerfilesComponent,
    AlbumPerfilComponent,
    BienvenidaComponent,
    LandingPageComponent,
    AlbumGeneralComponent,
    MenuPrincipalComponent,
    MisContactosComponent,
    MenuSeleccionPerfilesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CompartidoModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
    HammerModule,
    WebcamModule,
    ImageCropperModule,
    NgxPayPalModule,
    NgxStripeModule.forRoot('pk_test_51H7p9XHBVcdcrZQAhAQK81lD4du7n0CxEIxoCIILNNL9s1Fy44O9hZkD6qTPVHixtGNqWhI5D2EyYGsN4xtUy9bp00syWkrOeR'),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [
    CompartidoModule,
    TranslateModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: DetectorGestos },
    { provide: HTTP_INTERCEPTORS, useClass: PeticionInterceptor, multi: true },
    // ApiService,
    HandleError,
    IdiomaService,
    RestriccionRutas,
    RutasInicioSession
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
