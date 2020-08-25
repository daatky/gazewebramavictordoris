import { EstiloDelTextoServicio } from './../../../nucleo/servicios/diseno/estilo-del-texto.service'
import { MensajeError } from './../../diseno/modelos/error.interface'
import { ConfiguracionCropper } from '../../diseno/modelos/foto-editor.interface'
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, Dimensions, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {
  @ViewChild('crop', { static: false }) crop : ImageCropperComponent

  @Input() configuracion: ConfiguracionCropper
  @Output() imagenCortada: EventEmitter<ImageCroppedEvent>

  public mostrarLoader: boolean
  public mostrarCaja: boolean
  public mensajeError: MensajeError
  public croppedImage: any

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio
  ) {
    this.imagenCortada = new EventEmitter<ImageCroppedEvent>()
    this.mostrarLoader = true
    this.mostrarCaja = false
    this.mensajeError = {
      mostrarError: false,
      contenido: '',
      tamanoCompleto: false
    }
  }

  ngOnInit(): void {
  }

  // Cuando la imagen fue cortada
  imageCropped(event: ImageCroppedEvent) {
    this.imagenCortada.emit(event)
    this.cerrarCropper()
  }

  // Cuando la imagen es cargada en el cropper
  imageLoaded() {
    console.log('imagen cargada')
    this.cambiarStatusCropper(true, false, false)
  }

  // Cuando el componente empieza a cortar la imagen
  startCropImage() {
    console.log('iniciar a cortar la imagen')
    this.cambiarStatusCropper(false, true, false)
  }

  // Cuando el cropper esta listo para interactuar
  cropperReady(size: Dimensions) {
    // cropper ready
    // console.log('imagen cortada 2')
    // console.log(size)
  }

  // Cuando ocurre un error al cargar la imagen en el cropper
  loadImageFailed() {
    this.cambiarStatusCropper(false, false, true, 'Ocurrio un error al cargar la imagen en el cropper')
  }

  // Obtener imagen cortada
  getCropImage() {
    if (this.crop) {
      this.crop.crop()
      return
    }
      
    this.cambiarStatusCropper(false, false, true, 'Ocurrio un error al cortar la imagen')
    return
  }

  cerrarCropper() {
    this.cambiarStatusCropper(false, true, false)
    this.configuracion.imageBase64 = null
    this.configuracion.imageURL = null
    this.configuracion.imageFile = null
    this.configuracion.imageChangedEvent = null
    this.configuracion.mostrarModal = false
  }

  // Cambiar valores 
  cambiarStatusCropper(mostrarCaja:boolean, mostrarLoader: boolean, mostrarError: boolean, errorContenido?: string) {
    this.mostrarCaja = mostrarCaja
    this.mostrarLoader = mostrarLoader
    this.mensajeError.mostrarError = mostrarError
    if (errorContenido) {
      this.mensajeError.contenido = errorContenido
    }
  }

}
