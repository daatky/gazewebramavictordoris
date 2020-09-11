import { AccionEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { Observable } from 'rxjs';
import { UsuarioModel } from './../../dominio/modelo/usuario.model';
import { CuentaNegocio } from './../../dominio/logica-negocio/cuenta.negocio';
import { CodigosCatalogoEntidad, AccionAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { MediaEntity } from './../../dominio/entidades/media.entity';
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum';
import { CodigosCatalogoTipoArchivo } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-archivo.enum';
import { AlbumModel } from './../../dominio/modelo/album.model';
import { RutasLocales } from './../../rutas-locales.enum'
import { CatalogoTipoPerfilModel } from './../../dominio/modelo/catalogo-tipo-perfil.model'
import { PerfilNegocio } from './../../dominio/logica-negocio/perfil.negocio'
import { CodigosCatalogoTipoPerfil } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum'
import { CodigosCatalogoArchivosPorDefecto } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-archivos-defeto.enum'
import { GeneradorId } from './../../nucleo/servicios/generales/generador-id.service'
import { MediaModel } from '../../dominio/modelo/media.model'
import { ConfiguracionToast } from './../../compartido/diseno/modelos/toast.interface'
import { ToastComponent } from './../../compartido/componentes/toast/toast.component'
import { ConvertidorArchivos } from './../../nucleo/util/caster-archivo.service'
import { CodigosCatalogoTipoMedia } from '../../nucleo/servicios/remotos/codigos-catalogos/catalago-tipo-media.enum'
import { ConfiguracionCamara, ConfiguracionCropper } from '../../compartido/diseno/modelos/foto-editor.interface'
import { CamaraComponent } from './../../compartido/componentes/camara/camara.component'
import { UsoItemCircular } from './../../compartido/diseno/enums/uso-item-cir-rec.enum'
import { ItemCircularCompartido } from './../../compartido/diseno/modelos/item-cir-rec.interface'
import { MediaNegocio } from './../../dominio/logica-negocio/media.negocio'
import { LineaCompartida } from './../../compartido/diseno/modelos/linea.interface'
import { EstiloDelTextoServicio } from './../../nucleo/servicios/diseno/estilo-del-texto.service'
import { InfoAccionCirRec } from './../../compartido/diseno/modelos/info-accion-cir-rec.interface'
import { VariablesGlobales } from './../../nucleo/servicios/generales/variables-globales.service'
import { UsoAppBar } from './../../compartido/diseno/enums/uso-appbar.enum'
import { EspesorLineaItem } from './../../compartido/diseno/enums/espesor-linea-item.enum'
import { ColorFondoLinea } from './../../compartido/diseno/enums/color-fondo-linea.enum'
import { AnchoLineaItem } from './../../compartido/diseno/enums/ancho-linea-item.enum'
import { TamanoColorDeFondoAppBar } from './../../compartido/diseno/enums/tamano-color-fondo-appbar.enum'
import { ConfiguracionAppbarCompartida } from './../../compartido/diseno/modelos/appbar.interface'
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, HostListener } from '@angular/core'
import { AppbarComponent } from './../../compartido/componentes/appbar/appbar.component'
import { ActivatedRoute, Router } from '@angular/router'
import { ColorCapaOpacidadItem } from 'src/app/compartido/diseno/enums/item-cir-rec-capa-opacidad.enum'
import { AccionesItemCircularRectangular } from 'src/app/compartido/diseno/enums/acciones-item-cir-rec.enum'
import { WebcamImage } from 'ngx-webcam'
import { CropperComponent } from 'src/app/compartido/componentes/cropper/cropper.component'
import { ImageCroppedEvent } from 'ngx-image-cropper'

@Component({
  selector: 'app-album-perfil',
  templateUrl: './album-perfil.component.html',
  styleUrls: ['./album-perfil.component.scss']
})
export class AlbumPerfilComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appbar', { static: false }) appbar: AppbarComponent
  @ViewChild('camara', { static: false }) camara: CamaraComponent
  @ViewChild('cropper', { static: false }) cropper: CropperComponent
  @ViewChild('toast', { static: false }) toast: ToastComponent

  // Utils
  public accionAlbumEnum = AccionAlbum
  public eventoEnitemFuncion: Function
  public observable: any

  // Parametros de url
  public codigo: string // Indica el codigo de la entidad
  public entidad: CodigosCatalogoEntidad // Indica la entidad donde se esta usando el album
  public accionEntidad: AccionEntidad // Indica la accion de la entidad desde la que se accedio al album
  public titulo: string // El titulo a mostrar en el album
  public accionAlbum: AccionAlbum // Accion para la que el album esta siendo utilizado
  // public esVisitante: boolean // Visitante true 1, propietario false 0

  // Parametros internos
  public album: AlbumModel // Album en uso
  public cantidadMaximaFotos: number
  public confCamara: ConfiguracionCamara // Configuracion camara
  public confCropper: ConfiguracionCropper // Configuracion del cropper de imagenes
  public confToast: ConfiguracionToast // Configuracion del toast
  public confAppBar: ConfiguracionAppbarCompartida // Configuracion appbar compartida
  public confPortada: ItemCircularCompartido // Portada del album
  public confBotonUpload: ItemCircularCompartido // Boton siempre visible de upload photos
  public confLinea: LineaCompartida // Linea compartida


  public listaMediaAlbum: Array<MediaModel> // Para almacenar las medias a devolver en caso de crear
  public itemsAlbum: Array<ItemCircularCompartido> // Array de items compartido
  public itemsAlbumPorDefecto: Array<ItemCircularCompartido> // Array de items compartido - fotos por defecto
  public cantidadItemsPorDefecto: number // Numero total de items por defecto a mostrar


  constructor(
    private router: Router,
    private rutaActual: ActivatedRoute,
    private variablesGlobales: VariablesGlobales,
    public estiloDelTextoServicio: EstiloDelTextoServicio,
    private mediaNegocio: MediaNegocio,
    private convertidorArchivos: ConvertidorArchivos,
    private generadorId: GeneradorId,
    private perfilNegocio: PerfilNegocio,
    private cuentaNegocio: CuentaNegocio,
  ) {
    this.titulo = ''
    this.accionAlbum = AccionAlbum.CREAR
    this.cantidadMaximaFotos = 6
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
    this.validarAlbum()
    this.configurarCamara()
    this.configurarCropper()
    this.configurarToast()
    this.configurarAppBar()
    this.configurarPortada()
    this.configurarLinea()
    this.confgurarBotonUploadPhotos()
    this.configurarItemsAlbumPorDefecto()
    this.configurarItemsAlbum()

    // En caso la pagina sea recargada, se guarda el estado del album en el local sotarage
    window.onbeforeunload = () => this.ngOnDestroy()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Foto capturada
      this.camara.fotoCapturada.subscribe((webcamImage: WebcamImage) => {
        this.confCropper = {
          mostrarModal: true,
          imageURL: webcamImage.imageAsDataUrl
        }
      })

      // Imagen cortada
      this.cropper.imagenCortada.subscribe((imagen: ImageCroppedEvent) => {
        this.cropper.cambiarStatusCropper(false, true, false)
        this.subirArchivoAlServidor(imagen)
      })
    })
  }

  ngOnDestroy(): void {
    console.warn('destruyendo app')
    this.guardarAlbum()
  }

  configurarParametrosDeUrl() {
    const { codigo, entidad, accionEntidad, titulo, accionAlbum } = this.rutaActual.snapshot.params
    if (codigo && entidad && accionEntidad && titulo && accionAlbum) {
      this.codigo = codigo
      this.entidad = entidad
      this.accionEntidad = accionEntidad
      this.titulo = titulo
      this.accionAlbum = accionAlbum
    } else {
      // Caso contrario validar
    }
  }

  // Configurar album
  validarAlbum() {
    this.album = this.perfilNegocio.obtenerAlbumActivoDelSessionStorage()
    console.log(this.album)
    if (!this.album) {
      // Validar la entidad
      switch (this.entidad) {
        case CodigosCatalogoEntidad.PERFIL:
          const usuario: UsuarioModel = this.cuentaNegocio.obtenerUsuarioDelSessionStorage()
          console.log(usuario)
          // Si el usuario existe
          if (usuario) {
            usuario.perfiles.forEach(perfil => {
              if (perfil && perfil.tipoPerfil.codigo === this.codigo) {
                // Sacar el album de tipo perfil
                perfil.album.forEach(album => {
                  if (album && album.tipo.codigo === CodigosCatalogoTipoAlbum.PERFIL) {
                    this.album = album
                  }
                })
              }
            })
            if (!this.album) {
              console.log('sigue sin existir')
              this.router.navigateByUrl(RutasLocales.MENU_PERFILES)
            }
          } else {
            console.log('usuario no existe en album')
            this.router.navigateByUrl(RutasLocales.MENU_PERFILES)
          }
          break
        case CodigosCatalogoEntidad.PROYECTO: break;
        case CodigosCatalogoEntidad.NOTICIA: break;
        default: break;
      }
    }
  }

  configurarItemsAlbum() {
    // Items para el album
    if (this.album) {
      this.album.media.forEach(media => {
        this.itemsAlbum.push({
          id: media._id,
          idInterno: this.generadorId.generarIdConSemilla(),
          usoDelItem: UsoItemCircular.CIRALBUM,
          esVisitante: false,
          urlMedia: media.principal.url,
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
      })
      // Definir la portada
      if (this.album.portada && this.album.portada.principal && this.album.portada.principal.url.length > 0) {
        const portada: MediaModel = this.album.portada
        this.confPortada.mostrarLoader = true
        this.confPortada.id = portada._id
        this.confPortada.urlMedia = portada.principal.url
        this.confPortada.mostrarBoton = false
      }
    }
  }

  configurarCamara() {
    this.confCamara = {
      mostrarModal: false,
    }
  }

  configurarCropper() {
    this.confCropper = {
      mostrarModal: false
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
        configuracion: {
          mostrar: true,
          datos: {
            disable: true
          }
        },
        nombrePerfil: {
          mostrar: true,
          llaveTexto: this.obtenerLlaveSegunEntidadCodigo()
        },
        mostrarDivBack: true,
        mostrarTextoHome: false,
        subtitulo: {
          mostrar: true,
          llaveTexto: 'fotoPerfil'
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      },
      accionAtras: () => {
        this.accionAtrasAppBarBack()
      }
    }
  }

  configurarPortada() {
    this.confPortada = {
      id: '',
      idInterno: this.generadorId.generarIdConSemilla(),
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
      idInterno: this.generadorId.generarIdConSemilla(),
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

  obtenerColorCapaOpacidad(pos: number) {
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
    while (pos < this.cantidadItemsPorDefecto) {
      // Llenar item
      this.itemsAlbumPorDefecto.push(
        {
          id: 'itemFotoDefecto_' + pos,
          idInterno: this.generadorId.generarIdConSemilla(),
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
        // Validar si existen datos
        data.forEach((item) => {
          if (item.catalogoArchivoDefault === CodigosCatalogoArchivosPorDefecto.ALBUM_PERFIL) {
            this.itemsAlbumPorDefecto[pos].urlMedia = item.url
            console.warn(this.itemsAlbumPorDefecto[pos].urlMedia)
            pos += 1
          }
        })

        if (pos === 0) {
          // Ocultar loader cuando no existe datos
          this.itemsAlbumPorDefecto.forEach(item => {
            item.mostrarLoader = false
          })
        }
      }, error => {
        this.itemsAlbumPorDefecto.forEach(item => {
          item.mostrarBoton = true
          item.textoBoton = ''
        })
      })
  }

  subirArchivoAlServidor(event: ImageCroppedEvent) {
    const imagen = this.convertidorArchivos.dataURItoBlob(event.base64)
    const idItem: string = this.generadorId.generarIdConSemilla()
    this.itemsAlbum.push({
      id: idItem,
      idInterno: this.generadorId.generarIdConSemilla(),
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
    this.mediaNegocio.subirMediaSimpleAlServidor({ archivo: imagen, nombre: 'imagen.jpeg' }, '1:1', '').subscribe(data => {
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.album.media[pos] = data
        this.itemsAlbum[pos].id = data._id
        this.itemsAlbum[pos].urlMedia = data.principal.url
      }
    }, error => {
      this.toast.cambiarStatusToast('Lo sentimos, ocurrio un error al guardar la imagen', false, true, true)
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.album.media.splice(pos, 1)
        this.itemsAlbum.splice(pos, 1)
      }
    })
  }

  // Evento en items
  eventoEnItem(data: InfoAccionCirRec) {
    // Tomar Foto
    if (data.accion === AccionesItemCircularRectangular.TOMAR_FOTO) {
      if (this.itemsAlbum.length < this.cantidadMaximaFotos) {
        this.camara.reiniciarCamara()
        this.confCamara.mostrarModal = true
      } else {
        this.toast.cambiarStatusToast('Has elegido el numero maximo de fotos, elimina una para poder subir otra', false, true, true)
      }
      return
    }

    // Subir archivo
    if (data.accion === AccionesItemCircularRectangular.SUBIR_ARCHIVO) {
      if (this.itemsAlbum.length < this.cantidadMaximaFotos) {
        this.confCropper = {
          mostrarModal: true,
          imageFile: data.informacion.archivo[0]
        }
      } else {
        this.toast.cambiarStatusToast('Has elegido el numero maximo de fotos, elimina una para poder subir otra', false, true, true)
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

          // Actualizar el album
          this.album.portada._id = ''
          this.album.portada.principal._id = ''
          this.album.portada.principal.url = ''
        }
        this.album.media.splice(pos, 1)
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
        // Item portada, se valida que no se re asigne el mismo item
        if (this.confPortada.id !== data.informacion.id) {
          this.confPortada.mostrarBoton = false
          this.confPortada.id = data.informacion.id
          this.confPortada.mostrarLoader = true
          this.confPortada.urlMedia = data.informacion.urlMedia

          // Portada en item album
          const portadaMedia: MediaModel = this.obtenerMediaPorIdItem(this.confPortada.id)
          // Definir tipo a la portada
          portadaMedia.principal.tipo = {
            codigo: CodigosCatalogoTipoArchivo.IMAGEN
          }
          // Setear portada en el album activo
          this.album.portada = {
            ...portadaMedia,
            tipo: {
              codigo: CodigosCatalogoTipoMedia.TIPO_MEDIA_SIMPLE
            },
          }
        }
        return
      }
    }
  }

  // Cuando el usuario da al boton de back, se debe almacenar el album en el storage
  guardarAlbum() {
    if (this.entidad === CodigosCatalogoEntidad.PERFIL) {
      this.perfilNegocio.insertarAlbunEnPerfilDelSessionStorage(this.codigo, this.album)
    }
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

  obtenerMediaPorIdItem(id: string): MediaModel {
    let media = null
    this.album.media.forEach((item, i) => {
      if (item._id === id) {
        media = item
      }
    })
    return media
  }

  obtenerLlaveSegunEntidadCodigo() {
    if (this.entidad === CodigosCatalogoEntidad.PERFIL) {
      if (this.codigo === CodigosCatalogoTipoPerfil.CLASSIC) {
        return 'clasico'
      }

      if (this.codigo === CodigosCatalogoTipoPerfil.PLAYFUL) {
        return 'ludico'
      }

      if (this.codigo === CodigosCatalogoTipoPerfil.SUBSTITUTE) {
        return 'sustituto'
      }

      if (this.codigo === CodigosCatalogoTipoPerfil.GROUP) {
        return 'grupo'
      }
    }
    return ''
  }

  accionAtrasAppBarBack() {
    // Cuando el album es usado para Crear
    if (this.accionAlbum === AccionAlbum.CREAR) {
      if (this.entidad === CodigosCatalogoEntidad.PERFIL) {
        let ruta = RutasLocales.REGISTRO.toString()
        ruta = ruta.replace(':accionEntidad', this.accionEntidad)
        ruta = ruta.replace(':codigoPerfil', this.codigo)
        this.router.navigateByUrl(ruta)
      }
      return
    }
    // Cuando el album es usado para actualizar
    if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
      return
    }
  }

}