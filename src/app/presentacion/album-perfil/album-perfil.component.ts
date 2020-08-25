import { CatalogoTipoPerfilModel } from './../../dominio/modelo/catalogo-tipo-perfil.model';
import { PerfilNegocio } from './../../dominio/logica-negocio/perfil.negocio';
import { CodigosCatalogoTipoPerfil } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum';
import { CodigosCatalogoArchivosPorDefecto } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-archivos-defeto.enum';
import { CodigosCatalogoTipoArchivo } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-archivo.enum';
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum';
import { AlbumEntity } from './../../dominio/entidades/album.entity';
import { AccionesAppBar } from './../../compartido/diseno/enums/acciones-appbar.enum';
import { GeneradorId } from './../../nucleo/servicios/generales/generador-id.service';
import { MediaSimpleModel } from './../../dominio/modelo/media-simple.model';
import { ConfiguracionToast } from './../../compartido/diseno/modelos/toast.interface';
import { ToastComponent } from './../../compartido/componentes/toast/toast.component';
import { ConvertidorArchivos } from './../../nucleo/util/caster-archivo.service';
import { CodigosCatalogoTipoMedia } from './../../nucleo/servicios/remotos/codigos-catalogos/catalgo-tipo-media.enum';
import { ConfiguracionCamara, ConfiguracionCropper } from '../../compartido/diseno/modelos/foto-editor.interface'
import { CamaraComponent } from './../../compartido/componentes/camara/camara.component'
import { UsoItemCircular } from './../../compartido/diseno/enums/uso-item-cir-rec.enum'
import { ItemCircularCompartido } from './../../compartido/diseno/modelos/item-cir-rec.interface'
import { MediaNegocio } from './../../dominio/logica-negocio/media.negocio'
import { MediaEntity } from './../../dominio/entidades/media.entity'
import { LineaCompartida } from './../../compartido/diseno/modelos/linea.interface'
import { EstiloDelTextoServicio } from './../../nucleo/servicios/diseno/estilo-del-texto.service'
import { InfoAccionCirRec } from './../../compartido/diseno/modelos/info-accion-cir-rec.interface'
import { VariablesGlobales } from './../../nucleo/servicios/generales/variables-globales.service'
import { UsoAppBar } from './../../compartido/diseno/enums/uso-appbar.enum'
import { TamanoDeTextoConInterlineado } from './../../compartido/diseno/enums/tamano-letra-con-interlineado.enum'
import { EstilosDelTexto } from './../../compartido/diseno/enums/estilo-del-texto.enum'
import { ColorDelTexto } from './../../compartido/diseno/enums/color-del-texto.enum'
import { EspesorLineaItem } from './../../compartido/diseno/enums/espesor-linea-item.enum'
import { ColorFondoLinea } from './../../compartido/diseno/enums/color-fondo-linea.enum'
import { AnchoLineaItem } from './../../compartido/diseno/enums/ancho-linea-item.enum'
import { TamanoColorDeFondoAppBar } from './../../compartido/diseno/enums/tamano-color-fondo-appbar.enum'
import { TamanoDeAppBar } from './../../compartido/diseno/enums/tamano-appbar.enum'
import { ConfiguracionAppbarCompartida } from './../../compartido/diseno/modelos/appbar.interface'
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'
import { AppbarComponent } from './../../compartido/componentes/appbar/appbar.component'
import { ActivatedRoute, Router } from '@angular/router'
import { ColorCapaOpacidadItem } from 'src/app/compartido/diseno/enums/item-cir-rec-capa-opacidad.enum'
import { AccionesItemCircularRectangular } from 'src/app/compartido/diseno/enums/acciones-item-cir-rec.enum'
import { WebcamImage } from 'ngx-webcam'
import { CropperComponent } from 'src/app/compartido/componentes/cropper/cropper.component'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { MediaSimpleEntity } from 'src/app/dominio/entidades/media-simple.entity';

@Component({
  selector: 'app-album-perfil',
  templateUrl: './album-perfil.component.html',
  styleUrls: ['./album-perfil.component.scss']
})
export class AlbumPerfilComponent implements OnInit, AfterViewInit {
  @ViewChild('appbar', { static: false }) appbar: AppbarComponent
  @ViewChild('camara', { static: false }) camara: CamaraComponent
  @ViewChild('cropper', { static: false }) cropper: CropperComponent
  @ViewChild('toast', { static: false }) toast: ToastComponent

  // Utils
  public accionAlbumEnum = AccionAlbum
  public eventoEnitemFuncion: Function

  // Parametros de url
  public codigoPerfil: string
  public nombreUsuario: string
  public esVisitante: boolean // Visitante true 1, propietario false 0
  public accionAlbum: AccionAlbum // Accion para la que el album esta siendo utilizado
  public listaTipoPerfiles: CatalogoTipoPerfilModel[]  // Lista de perfiles del local
  public tipoPerfil: CatalogoTipoPerfilModel // Perfil activo

  // Parametros internos
  public cantidadMaximaFotos:number
  public confCamara: ConfiguracionCamara // Configuracion camara
  public confCropper: ConfiguracionCropper // Configuracion del cropper de imagenes
  public confToast: ConfiguracionToast // Configuracion del toast
  public confAppBar: ConfiguracionAppbarCompartida // Configuracion appbar compartida
  public confPortada: ItemCircularCompartido // Portada del album
  public confBotonUpload: ItemCircularCompartido // Boton siempre visible de upload photos
  public confLinea: LineaCompartida // Linea compartida
  public album: AlbumEntity // Entidad del album


  public listaMediaAlbum: Array<MediaSimpleEntity> // Para almacenar las medias a devolver en caso de crear
  public itemsAlbum: Array<ItemCircularCompartido> // Array de items compartido
  public itemsAlbumPorDefecto: Array<ItemCircularCompartido> // Array de items compartido - fotos por defecto
  public cantidadItemsPorDefecto: number // Numero total de items por defecto a mostrar


  constructor(
    private router: Router,
    private rutaActual:ActivatedRoute,
    private variablesGlobales:VariablesGlobales,
    public estiloDelTextoServicio:EstiloDelTextoServicio,
    private mediaNegocio: MediaNegocio,
    private convertidorArchivos: ConvertidorArchivos,
    private generadorId: GeneradorId,
    private perfilNegocio: PerfilNegocio
  ) {
    this.cantidadMaximaFotos = 6
    this.nombreUsuario = ''
    this.esVisitante = true
    this.accionAlbum = AccionAlbum.CREAR
    this.listaMediaAlbum = []
    this.itemsAlbum = []
    this.itemsAlbumPorDefecto = []
    this.cantidadItemsPorDefecto = 5
    this.eventoEnitemFuncion = (data: InfoAccionCirRec) => {
      this.eventoEnItem(data)
    }
  }

  ngOnInit(): void {
    this.variablesGlobales.mostrarMundo = false
    this.configurarParametrosDeUrl()
    this.obtenerTipoPerfil()
    this.configurarCamara()
    this.configurarCropper()
    this.configurarToast()
    this.configurarAppBar()
    this.configurarPortada()
    this.configurarLinea()
    this.confgurarBotonUploadPhotos()
    this.configurarItemsAlbumPorDefecto()

    // Validar album
    this.validarAlbumExistente()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Appbar
      this.appbar.evento.subscribe((data: AccionesAppBar) => {
        if (data === AccionesAppBar.IR_A_PAGINA_O_ESTADO_ANTERIOR) {
          // Cuando el album es usado para Crear
          if (this.accionAlbum === AccionAlbum.CREAR) {
            this.crearAlbumPerfilYGuardarEnStorage()
            // this.router.navigateByUrl(RutasPresentacion.REGISTRO)
            return
          }
          // Cuando el album es usado para actualizar
          if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
            return
          }
          return
        }
      })

      // Foto capturada
      this.camara.fotoCapturada.subscribe((webcamImage: WebcamImage) => {
        this.cropper.configuracion.imageURL = webcamImage.imageAsDataUrl
        this.cropper.configuracion.mostrarModal = true
      })

      // Imagen cortada
      this.cropper.imagenCortada.subscribe((imagen: ImageCroppedEvent) => {
        this.cropper.cambiarStatusCropper(false, true, false)
        this.subirArchivoDeCamaraAlServidor(imagen)
      })
    })
  }

  configurarParametrosDeUrl() {
    if (this.rutaActual.snapshot.params.codigoPerfil) {
      this.codigoPerfil = this.rutaActual.snapshot.params.codigoPerfil
    }

    if (this.rutaActual.snapshot.params.nombreUsuario) {
      this.nombreUsuario = this.rutaActual.snapshot.params.nombreUsuario
    }
    
    if (this.rutaActual.snapshot.params.accionAlbum) { 
      this.accionAlbum =  this.rutaActual.snapshot.params.accionAlbum
    }
  }

  // Define el tipo de perfil activo
  obtenerTipoPerfil() {
    this.listaTipoPerfiles = this.perfilNegocio.obtenerCatalogoTipoPerfilLocal()
    this.listaTipoPerfiles.forEach(perfil => {
      if (perfil.codigo === this.codigoPerfil) {
        this.tipoPerfil = perfil
      }
    })
  }

  // Configurar album
  validarAlbumExistente() {
    // Si el perfil no existe
    if (!this.tipoPerfil.perfil) {
      this.tipoPerfil.perfil = {
        albums: []
      }
    }

    // Si el album no existe
    if (!this.tipoPerfil.perfil.albums) {
      this.tipoPerfil.perfil['albums'] = []
    }

    console.log(this.tipoPerfil)

  }

  configurarCamara() {
    this.confCamara = {
      mostrarModal: false,
    }
  }

  configurarCropper() {
    this.confCropper = {
      mostrarModal: false,
      imageChangedEvent: null,
      imageBase64: null,
      imageFile: null
    }
  }

  configurarToast() {
    this.confToast = {
      mostrarToast: false,
      mostrarLoader: false,
      cerrarClickOutside: false,
      texto: ''
    }
  }

  configurarAppBar() {
    this.confAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: true,
          llaveTexto: 'clasico'
        },
        mostrarTextoBack: true,
        mostrarTextoHome: false,
        subtitulo: {
          mostrar: true,
          llaveTexto: 'fotoPerfil'
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100, 
      }
    }
  }

  configurarPortada() {
    this.confPortada = {
      id: '',
      idInterno: '',
      usoDelItem: UsoItemCircular.CIRPERFIL,
      esVisitante: true,
      urlMedia: '',
      activarClick: false,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
      textoBoton: 'Chosen photos',
      eventoEnItem: this.eventoEnitemFuncion,
      capaOpacidad: {
        mostrar: false
      }
    }
  }

  configurarLinea() {
    this.confLinea = {
      ancho: AnchoLineaItem.ANCHO6382,
      colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
      espesor: EspesorLineaItem.ESPESOR041,
      forzarAlFinal: false
    }
  }

  confgurarBotonUploadPhotos() {
    this.confBotonUpload = {
      id: 'botonUpload',
      idInterno: '',
      usoDelItem: UsoItemCircular.CIRALBUM,
      esVisitante: false,
      urlMedia: '',
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
      textoBoton: 'Click to upload',
      eventoEnItem: this.eventoEnitemFuncion,
      capaOpacidad: {
        mostrar: false
      }
    }
  }

  validarDivisorGrilla(pos: number) {
    if (pos === 0 || pos % 2 === 0) {
      return false
    }

    return true
  }

  obtenerColorCapaOpacidad(pos:number) {
    // Opacidad C
    if (pos === 0 || pos === 3) {
      return ColorCapaOpacidadItem.CAPA_OPACIDAD_C
    }
    // Opacidad B
    if (pos === 1 || pos === 2) {
      return ColorCapaOpacidadItem.CAPA_OPACIDAD_B
    }
    // Opacidad A
    return ColorCapaOpacidadItem.CAPA_OPACIDAD_A
  }

  configurarItemsAlbumPorDefecto() {
    let pos = 0
    while( pos < this.cantidadItemsPorDefecto ) {
      // Llenar item
      this.itemsAlbumPorDefecto.push(
        {
          id: 'itemFotoDefecto_' + pos,
          idInterno: '',
          usoDelItem: UsoItemCircular.CIRALBUM,
          esVisitante: true,
          urlMedia: '',
          activarClick: false,
          activarDobleClick: false,
          activarLongPress: false,
          mostrarBoton: false,
          mostrarLoader: true,
          textoBoton: 'Click to upload',
          capaOpacidad: {
            mostrar: true,
            colorOpacidad: this.obtenerColorCapaOpacidad(pos)
          }
        }
      )
      pos += 1
    }

    pos = 0
    this.mediaNegocio.obtenerListaArchivosDefault()
      .subscribe(data => {
        data.forEach((item) => {
          if (item.catalogoArchivoDefault === CodigosCatalogoArchivosPorDefecto.ALBUM_PERFIL) {
            this.itemsAlbumPorDefecto[pos].urlMedia = item.url
            pos += 1
          }
        })
        // Se reinicia por defecto
      }, error => {
        this.itemsAlbumPorDefecto.forEach(item => {
          item.mostrarBoton = true
          item.textoBoton = ''
        })
      })
  }

  subirArchivoDeCamaraAlServidor(event: ImageCroppedEvent) {
    const imagen = this.convertidorArchivos.dataURItoBlob(event.base64)
    const idItem: string = this.generadorId.generarIdConSemilla()
    this.itemsAlbum.push({
      id: idItem,
      idInterno: '',
      usoDelItem: UsoItemCircular.CIRALBUM,
      esVisitante: false,
      urlMedia: '',
      activarClick: false,
      activarDobleClick: true,
      activarLongPress: true,
      mostrarBoton: false,
      mostrarLoader: true,
      textoBoton: 'Click to upload',
      capaOpacidad: {
        mostrar: false
      },
      eventoEnItem: this.eventoEnitemFuncion
    })


    // Subir archivo al servidor
    this.mediaNegocio.subirMediaSimpleAlServidor( { archivo: imagen, nombre: 'imagen.jpeg' }, '1:1', '').subscribe(data => {
      console.log(data)
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.listaMediaAlbum[pos] = (data)
        this.itemsAlbum[pos].id = data._id
        this.itemsAlbum[pos].urlMedia = data.principal.url
      }
    }, error => {
      console.log(error)
      this.toast.cambiarStatusToast( 'Lo sentimos, ocurrio un error al guardar la imagen', false, true, true )
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.listaMediaAlbum.splice(pos, 1)
        this.itemsAlbum.splice(pos, 1)
      }
    })
  }

  subirArchivoDeSelectorAlServidor(file: File) {
    const idItem: string = this.generadorId.generarIdConSemilla()
    this.itemsAlbum.push({
      id: idItem,
      idInterno: '',
      usoDelItem: UsoItemCircular.CIRALBUM,
      esVisitante: false,
      urlMedia: '',
      activarClick: false,
      activarDobleClick: true,
      activarLongPress: true,
      mostrarBoton: false,
      mostrarLoader: true,
      textoBoton: 'Click to upload',
      capaOpacidad: {
        mostrar: false
      },
      eventoEnItem: this.eventoEnitemFuncion
    })


    // Subir archivo al servidor
    this.mediaNegocio.subirMediaSimpleAlServidor( { archivo: file, nombre: file.name }, '1:1', '').subscribe(data => {
      console.log(data)
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.listaMediaAlbum.push(data)
        this.itemsAlbum[pos].id = data._id
        this.itemsAlbum[pos].urlMedia = data.principal.url
      }
    }, error => {
      this.toast.cambiarStatusToast( 'Lo sentimos, ocurrio un error al guardar la imagen', false, true, true )
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.listaMediaAlbum.splice(pos, 1)
        this.itemsAlbum.splice(pos, 1)
      }
    })
  }


  // Evento en items
  eventoEnItem(data: InfoAccionCirRec) {
    console.log(data)
    // Tomar Foto
    if (data.accion === AccionesItemCircularRectangular.TOMAR_FOTO) {
      if (this.itemsAlbum.length < this.cantidadMaximaFotos) {
        this.camara.reiniciarCamara()
        this.confCamara.mostrarModal = true
      } else {
        this.toast.cambiarStatusToast( 'Has elegido el numero maximo de fotos, elimina una para poder subir otra', false, true, true )
      }
      return
    }

    // Subir archivo
    if (data.accion === AccionesItemCircularRectangular.SUBIR_ARCHIVO) {
      if (this.itemsAlbum.length < this.cantidadMaximaFotos) {  
        this.subirArchivoDeSelectorAlServidor(data.informacion.archivo[0])
      } else {
        this.toast.cambiarStatusToast( 'Has elegido el numero maximo de fotos, elimina una para poder subir otra', false, true, true )
      }
      return
    }

    // Borrar item
    if (data.accion === AccionesItemCircularRectangular.BORRAR_ITEM) {
      // Cuando la accion del album es Crear, se debe eliminar el item solo de la lista
      if (this.accionAlbum === AccionAlbum.CREAR) {
        let pos = -1
        this.itemsAlbum.forEach((item, i) => {
          if (item.id === data.informacion.id) {
            pos = i
          }
        })
        // Validar si el item de la portada fue borrado
        if (this.itemsAlbum[pos].id === this.confPortada.id) {
          this.confPortada.id = ''
          this.confPortada.urlMedia = ''
          this.confPortada.mostrarLoader = false
          this.confPortada.mostrarBoton = true
        }
        this.itemsAlbum.splice(pos, 1)
        return
      }

      // Cuando el uso del album es Actualizar, se debe eliminar en el servidor
      if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
        // Mostrar loader y demas de la peticion
        return
      }
    }

    // Establecer foto por defecto
    if (data.accion === AccionesItemCircularRectangular.ESTABLECER_ITEM_PREDETERMINADO) {
      // Cuando la accion del album es Crear
      if (this.accionAlbum === AccionAlbum.CREAR) {
        this.confPortada.mostrarBoton = false
        this.confPortada.id = data.informacion.id
        this.confPortada.mostrarLoader = true
        this.confPortada.urlMedia = data.informacion.urlMedia
        return
      }
    }
  }

  // Cuando el usuario da al boton de back, se debe almacenar el album en el storage
  crearAlbumPerfilYGuardarEnStorage() {
    const portadaMedia: MediaSimpleEntity = this.obtenerMediaPorIdItem(this.confPortada.id)
    const album: AlbumEntity = {
      portada: {
        tipo: {
          codigo: CodigosCatalogoTipoMedia.TIPO_MEDIA_SIMPLE
        },
        principal: {
          ...portadaMedia,
          tipo: {
            codigo: CodigosCatalogoTipoArchivo.IMAGEN
          },
        },
      },
      tipo: {
        codigo: CodigosCatalogoTipoAlbum.PERFIL,
      },
      media: this.listaMediaAlbum
    }
    console.log(album)
    // Obtener lista del local storage
    // let albumsLocalStorage: AlbumEntity[] = this.mediaNegocio.obtenerListaAlbumDelLocalStorage()
    // if (!albumsLocalStorage || albumsLocalStorage === null) {
    //   albumsLocalStorage = []
    // }
    // // Insertar el album
    // albumsLocalStorage.push(album)
    // Guardar en el storage
    // this.mediaNegocio.guardarListaAlbumEnLocalStorage(albumsLocalStorage)
  }

  obtenerPosicionPorIdItem(id: string) {
    let pos = -1
    this.itemsAlbum.forEach((item, i) => {
      if (item.id === id) {
        pos = i
      }
    })
    return pos
  }

  obtenerMediaPorIdItem(id: string) : MediaSimpleEntity {
    let media = null
    this.listaMediaAlbum.forEach((item, i) => {
      if (item._id === id) {
        media = item
      }
    })
    return media
  }

  obtenerLlaveSegunPerfil() {
    if (this.codigoPerfil === CodigosCatalogoTipoPerfil.CLASSIC) {
      return 'clasico'
    }

    if (this.codigoPerfil === CodigosCatalogoTipoPerfil.PLAYFUL) {
      return 'ludico'
    }

    if (this.codigoPerfil === CodigosCatalogoTipoPerfil.SUBSTITUTE) {
      return 'sustituto'
    }

    if (this.codigoPerfil === CodigosCatalogoTipoPerfil.GROUP) {
      return 'grupo'
    }

    return ''
  }

}


export enum AccionAlbum {
    CREAR = 'creando',
    ACTUALIZAR = 'actualizando',
}