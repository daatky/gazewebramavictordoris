import { Subject, Observable } from 'rxjs'
import { EstiloDelTextoServicio } from './../../../nucleo/servicios/diseno/estilo-del-texto.service'
import { MensajeError } from './../../diseno/modelos/error.interface'
import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core'
import { ConfiguracionCamara } from '../../diseno/modelos/foto-editor.interface'
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam'

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss']
})
export class CamaraComponent implements OnInit {

  @Input() configuracion: ConfiguracionCamara
  @Output() fotoCapturada: EventEmitter<WebcamImage>

  private trigger: Subject<void>
  private switchCamera: Subject<boolean|string>
  private nextWebcam: Subject<boolean|string>
  public showWebcam = true
  public allowCameraSwitch = true
  public multipleWebcamsAvailable = false
  public deviceId: string
  public errors: WebcamInitError[] = []
  public webcamImage: WebcamImage

  public anchoCamara: number;
  public altoCamara: number;
  public mostrarLoader: boolean
  public mensajeError: MensajeError

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio
  ) {
    this.onResize()
    this.fotoCapturada = new EventEmitter<WebcamImage>()
    this.trigger = new Subject<void>()
    this.switchCamera = new Subject<boolean|string>()
    this.nextWebcam = new Subject<boolean|string>()
    this.webcamImage = null
    this.allowCameraSwitch = false
    this.multipleWebcamsAvailable = false
    this.mostrarLoader = false
    this.mensajeError = {
      mostrarError: false,
      contenido: '',
      tamanoCompleto: false
    }
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1
    });
  }

  reiniciarCamara() {
    this.mensajeError.mostrarError = false
    this.mensajeError.contenido = ''
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window
    this.anchoCamara = win.innerWidth
    this.altoCamara = win.innerHeight
  }
  public triggerSnapshot(): void {
    this.trigger.next()
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error)
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId)
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage)
    this.webcamImage = webcamImage
    this.fotoCapturada.emit(webcamImage)
    this.configuracion.mostrarModal = false
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable()
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable()
  }

  // Cerrar Camara
  cerrarCamara() {

    this.configuracion.mostrarModal = false
  }

  // Error en camara
  errorEnCamara(error: WebcamInitError): void {
    console.log(error)
    if (error) {
      if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
        this.mensajeError.contenido = "Camera access was not allowed by user!"
        this.mensajeError.mostrarError = true
        return
      }

      this.mensajeError.contenido = error.message
      this.mensajeError.mostrarError = true
      return
    }
  }

}
