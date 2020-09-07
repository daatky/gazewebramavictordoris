import { TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { CrearComponenteDirective } from './directivas/crear-componente.directive'
import { EstiloListaDirective } from './directivas/estilo-lista.directive'
import { ListaVerticalComponent } from "./componentes/lista-vertical/lista-vertical.component";
import { CargandoComponent } from './componentes/cargando/cargando.component';
import { ButtonComponent } from './componentes/button/button.component';
import { InputComponent } from './componentes/input/input.component';
import { ItemCirculoComponent } from './componentes/item-circulo/item-circulo.component';
import { ItemRectanguloComponent } from './componentes/item-rectangulo/item-rectangulo.component';
import { ItemMenuComponent } from './componentes/item-menu/item-menu.component';
import { LineaComponent } from './componentes/linea/linea.component';
import { AppbarComponent } from './componentes/appbar/appbar.component'
import { DialogoComponent } from './componentes/dialogo/dialogo.component';
import { PortadaGazeComponent } from './componentes/portada-gaze/portada-gaze.component';
import { ItemPensamientoComponent } from './componentes/item-pensamiento/item-pensamiento.component'
import { SelectorComponent } from './componentes/selector/selector.component';
import { BuscadorModalComponent } from './componentes/buscador-modal/buscador-modal.component'
import { WebcamModule } from 'ngx-webcam'
import { CabeceraIdiomasComponent } from './componentes/cabecera-idiomas/cabecera-idiomas.component'
import { CamaraComponent } from './componentes/camara/camara.component'
import { CropperComponent } from './componentes/cropper/cropper.component'
import { ImageCropperModule } from 'ngx-image-cropper'
import { ToastComponent } from './componentes/toast/toast.component'
import { DialogoContenidoComponent } from './componentes/dialogo-contenido/dialogo-contenido.component'
import { ItemFechaComponent } from './componentes/item-fecha/item-fecha.component'
import { PensamientoCompartidoComponent } from './componentes/pensamiento/pensamiento-compartido.component';
import { ModalInferiorComponent } from './componentes/modal-inferior/modal-inferior.component';
import { DialogoInlineComponent } from './componentes/dialogo-inline/dialogo-inline.component';
import { ListoComponent } from './componentes/listo/listo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule,
    ImageCropperModule
  ],
  declarations: [
    CrearComponenteDirective,
    EstiloListaDirective,
    ListaVerticalComponent,
    CargandoComponent,
    ButtonComponent,
    InputComponent,
    ItemCirculoComponent,
    ItemRectanguloComponent,
    ItemMenuComponent,
    LineaComponent,
    AppbarComponent,
    DialogoComponent,
    PortadaGazeComponent,
    PensamientoCompartidoComponent,
    ItemPensamientoComponent,
    SelectorComponent,
    BuscadorModalComponent,
    CabeceraIdiomasComponent,
    CamaraComponent,
    CropperComponent,
    ToastComponent,
    ItemFechaComponent,
    DialogoContenidoComponent,
    ModalInferiorComponent,
    DialogoInlineComponent,
    ListoComponent,
  ],
  exports: [
    CrearComponenteDirective,
    EstiloListaDirective,
    ListaVerticalComponent,
    CargandoComponent,
    ButtonComponent,
    InputComponent,
    ItemCirculoComponent,
    ItemRectanguloComponent,
    ItemMenuComponent,
    LineaComponent,
    AppbarComponent,
    DialogoComponent,
    PortadaGazeComponent,
    PensamientoCompartidoComponent,
    ItemPensamientoComponent,
    SelectorComponent,
    BuscadorModalComponent,
    CabeceraIdiomasComponent,
    CamaraComponent,
    CropperComponent,
    ToastComponent,
    ItemFechaComponent,
    DialogoContenidoComponent,
    ModalInferiorComponent,
    DialogoInlineComponent
  ]
})

export class CompartidoModule { }
