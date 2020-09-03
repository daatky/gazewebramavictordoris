import { CuentaNegocio } from './../../dominio/logica-negocio/cuenta.negocio';
import { UsuarioModel } from './../../dominio/modelo/usuario.model';
import { MediaModel } from './../../dominio/modelo/media.model';
import { RutasLocales } from 'src/app/rutas-locales.enum';
import { TranslateService } from '@ngx-translate/core';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { CodigosCatalogoEntidad } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { AlbumModel } from './../../dominio/modelo/album.model'
import { CodigosCatalogoArchivosPorDefecto } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-archivos-defeto.enum'
import { CodigosCatalogoTipoArchivo } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-archivo.enum'
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum'
import { AlbumEntity } from './../../dominio/entidades/album.entity'
import { GeneradorId } from './../../nucleo/servicios/generales/generador-id.service'
import { ConfiguracionToast } from './../../compartido/diseno/modelos/toast.interface'
import { ToastComponent } from './../../compartido/componentes/toast/toast.component'
import { ConvertidorArchivos } from './../../nucleo/util/caster-archivo.service'
import { CodigosCatalogoTipoMedia } from '../../nucleo/servicios/remotos/codigos-catalogos/catalago-tipo-media.enum'
import { ConfiguracionCamara, ConfiguracionCropper } from '../../compartido/diseno/modelos/foto-editor.interface'
import { CamaraComponent } from './../../compartido/componentes/camara/camara.component'
import { UsoItemCircular, UsoItemRectangular } from './../../compartido/diseno/enums/uso-item-cir-rec.enum'
import { ItemCircularCompartido, ItemRectangularCompartido } from './../../compartido/diseno/modelos/item-cir-rec.interface'
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
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core'
import { AppbarComponent } from './../../compartido/componentes/appbar/appbar.component'
import { ActivatedRoute, Router } from '@angular/router'
import { ColorCapaOpacidadItem } from 'src/app/compartido/diseno/enums/item-cir-rec-capa-opacidad.enum'
import { AccionesItemCircularRectangular } from 'src/app/compartido/diseno/enums/acciones-item-cir-rec.enum'
import { WebcamImage } from 'ngx-webcam'

@Component({
  selector: 'app-album-general',
  templateUrl: './album-general.component.html',
  styleUrls: ['./album-general.component.scss']
})
export class AlbumGeneralComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appbar', { static: false }) appbar: AppbarComponent
  @ViewChild('camara', { static: false }) camara: CamaraComponent
  @ViewChild('toast', { static: false }) toast: ToastComponent

  // Utils
  public accionAlbumEnum = AccionAlbum
  public eventoEnitemFuncion: Function

  // Parametros de texto en items
  public textoCerrarDescripcion: string // Texto que se muestra cuando se empiece a editar la descripcion de la foto

  // Parametros de url
  public entidad: CodigosCatalogoEntidad // Indica la entidad donde se esta usando el album
  public codigo: string // Indica el codigo de la entidad
  public titulo: string // El titulo a mostrar en el album
  public esVisitante: boolean // Visitante true 1, propietario false 0
  public accionAlbum: AccionAlbum // Accion para la que el album esta siendo utilizado

  // Parametros internos
  public idItemActivo: string // Item activo editando la descripcion
  public itemDescripcionActivo: string // Descricion activo
  public album: AlbumModel // Album en uso
  public confCamara: ConfiguracionCamara // Configuracion camara
  public confToast: ConfiguracionToast // Configuracion del toast
  public confAppBar: ConfiguracionAppbarCompartida // Configuracion appbar compartida
  public confPortada: ItemRectangularCompartido // Portada del album
  public confBotonUpload: ItemRectangularCompartido // Boton siempre visible de upload photos
  public confLinea: LineaCompartida // Linea compartida
  public itemsAlbum: Array<ItemRectangularCompartido> // Array de items compartido
  public itemsAlbumPorDefecto: Array<ItemRectangularCompartido> // Array de items compartido - fotos por defecto
  public cantidadItemsPorDefecto: number // Numero total de items por defecto a mostrar
  public albumEnModoPreview: boolean // Album pasa a modo preview


  constructor(
    private router: Router,
    private rutaActual:ActivatedRoute,
    private variablesGlobales:VariablesGlobales,
    public estiloDelTextoServicio:EstiloDelTextoServicio,
    private mediaNegocio: MediaNegocio,
    private convertidorArchivos: ConvertidorArchivos,
    private generadorId: GeneradorId,
    private perfilNegocio: PerfilNegocio,
    private cuentaNegocio: CuentaNegocio,
    private translateService: TranslateService
  ) {
    this.idItemActivo = ''
    this.itemDescripcionActivo = ''
    this.titulo = ''
    this.esVisitante = true
    this.accionAlbum = AccionAlbum.CREAR
    this.itemsAlbum = []
    this.itemsAlbumPorDefecto = []
    this.cantidadItemsPorDefecto = 7
    this.albumEnModoPreview = false
    this.textoCerrarDescripcion = ''
    this.eventoEnitemFuncion = (data: InfoAccionCirRec) => {
      this.eventoEnItem(data)
    }
  }

  ngOnInit(): void {
    this.variablesGlobales.mostrarMundo = false
    this.configurarParametrosDeUrl()
    this.validarAlbum()
    this.configurarCamara()
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
        this.subirArchivoDeCamaraAlServidor(webcamImage)
      })

    })
  }

  ngOnDestroy(): void {
    this.guardarAlbum()
  }

  configurarParametrosDeUrl() {
    if (this.rutaActual.snapshot.params.entidad) {
      this.entidad = this.rutaActual.snapshot.params.entidad
    }

    if (this.rutaActual.snapshot.params.codigo) {
      this.codigo = this.rutaActual.snapshot.params.codigo
    }

    if (this.rutaActual.snapshot.params.titulo) {
      this.titulo = this.rutaActual.snapshot.params.titulo
    }
    
    if (this.rutaActual.snapshot.params.accion) { 
      this.accionAlbum =  this.rutaActual.snapshot.params.accion
    }
  }

  validarAlbum() {
    this.album = this.perfilNegocio.obtenerAlbumActivo()
    // Si album activo no esta definido
    if (!this.album) {
      // Validar la entidad
      // Entidad perfil
      if (this.entidad === CodigosCatalogoEntidad.PERFIL) {
        const usuario: UsuarioModel = this.cuentaNegocio.obtenerUsuarioDelLocalStorage()
        // Si el usuario existe
        if (usuario) {
          usuario.perfiles.forEach(perfil => {
            if (perfil.tipoPerfil.codigo === this.codigo) {
              // Sacar el album de tipo general
              perfil.album.forEach(album => {
                if (album.tipo.codigo === CodigosCatalogoTipoAlbum.GENERAL) {
                  this.album = album
                }
              })
            }
          })
        } else {
          this.router.navigateByUrl(RutasLocales.REGISTRO.toString().replace(':codigoPerfil', this.codigo))
        }
        return
      }
    }
  }

  async configurarItemsAlbum() {
    // Items para el album
    this.album.media.forEach(media => {
      this.itemsAlbum.push({
        id: media._id,
        idInterno: '',
        usoDelItem: UsoItemRectangular.RECALBUMMINI,
        esVisitante: false,
        urlMedia: media.principal.url,
        activarClick: true,
        activarDobleClick: true,
        activarLongPress: true,
        mostrarBoton: false,
        mostrarLoader: true,
        textoBoton: 'Click to upload',
        capaOpacidad: {
          mostrar: false
        },
        eventoEnItem: this.eventoEnitemFuncion,
        descripcion: media.descripcion,
        textoCerrarEditarDescripcion: this.textoCerrarDescripcion,
        mostrarIconoExpandirFoto: false,
        mostrarCapaImagenSeleccionadaConBorde: false,
        esBotonUpload: false
      })
    })
    // Definir la portada
    if (this.album.portada && this.album.portada.principal) {
      const portada: MediaModel = this.album.portada
      this.confPortada.mostrarLoader = true
      this.confPortada.id = portada._id
      this.confPortada.urlMedia = portada.principal.url
      this.confPortada.mostrarBoton = false
    }

    this.textoCerrarDescripcion = await this.translateService.get('clickSalirDescripcion').toPromise()
    this.itemsAlbum.forEach(item => {
      item.textoCerrarEditarDescripcion = this.textoCerrarDescripcion
    })
  }

  configurarCamara() {
    this.confCamara = {
      mostrarModal: false,
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
        this.accionAppBarBack()
      }
    }
  }

  configurarPortada() {
    this.confPortada = {
      id: '',
      idInterno: '',
      usoDelItem: UsoItemRectangular.RECPERFIL,
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
      },
      esBotonUpload: false
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
      usoDelItem: UsoItemRectangular.RECALBUMMINI,
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
      },
      esBotonUpload: true
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
          usoDelItem: UsoItemRectangular.RECALBUMMINI,
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
          },
          esBotonUpload: false
        }
      )
      pos += 1
    }

    pos = 0
    this.mediaNegocio.obtenerListaArchivosDefault()
      .subscribe(data => {
        data.forEach((item) => {
          if (item.catalogoArchivoDefault === CodigosCatalogoArchivosPorDefecto.ALBUM_GENERAL) {
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

  subirArchivoDeCamaraAlServidor(image: WebcamImage) {
    const imagen = this.convertidorArchivos.dataURItoBlob(image.imageAsDataUrl)
    const idItem: string = this.generadorId.generarIdConSemilla()
    this.itemsAlbum.push({
      id: idItem,
      idInterno: '',
      usoDelItem: UsoItemRectangular.RECALBUMMINI,
      esVisitante: false,
      urlMedia: '',
      activarClick: true,
      activarDobleClick: true,
      activarLongPress: true,
      mostrarBoton: false,
      mostrarLoader: true,
      textoBoton: 'Click to upload',
      capaOpacidad: {
        mostrar: false
      },
      eventoEnItem: this.eventoEnitemFuncion,
      descripcion: '',
      textoCerrarEditarDescripcion: this.textoCerrarDescripcion,
      mostrarIconoExpandirFoto: false,
      mostrarCapaImagenSeleccionadaConBorde: false,
      esBotonUpload: false
    })


    // Subir archivo al servidor
    this.mediaNegocio.subirMediaSimpleAlServidor( { archivo: imagen, nombre: 'imagen.jpeg' }, '1:1', '').subscribe(data => {
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.album.media[pos] = data
        this.itemsAlbum[pos].id = data._id
        this.itemsAlbum[pos].urlMedia = data.principal.url
        this.itemsAlbum[pos].descripcion = data.descripcion
      }
    }, error => {
      this.toast.cambiarStatusToast( 'Lo sentimos, ocurrio un error al guardar la imagen', false, true, true )
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.album.media.splice(pos, 1)
        this.itemsAlbum.splice(pos, 1)
      }
    })
  }

  subirArchivoDeSelectorAlServidor(file: File) {
    const idItem: string = this.generadorId.generarIdConSemilla()
    this.itemsAlbum.push({
      id: idItem,
      idInterno: '',
      usoDelItem: UsoItemRectangular.RECALBUMMINI,
      esVisitante: false,
      urlMedia: '',
      activarClick: true,
      activarDobleClick: true,
      activarLongPress: true,
      mostrarBoton: false,
      mostrarLoader: true,
      textoBoton: 'Click to upload',
      capaOpacidad: {
        mostrar: false
      },
      eventoEnItem: this.eventoEnitemFuncion,
      descripcion: '',
      textoCerrarEditarDescripcion: this.textoCerrarDescripcion,
      mostrarIconoExpandirFoto: false,
      mostrarCapaImagenSeleccionadaConBorde: false,
      esBotonUpload: false
    })


    // Subir archivo al servidor
    this.mediaNegocio.subirMediaSimpleAlServidor( { archivo: file, nombre: file.name }, '1:1', '').subscribe(data => {
      const pos = this.obtenerPosicionPorIdItem(idItem)
      if (pos >= 0) {
        this.album.media[pos] = data
        this.itemsAlbum[pos].id = data._id
        this.itemsAlbum[pos].urlMedia = data.principal.url
        this.itemsAlbum[pos].descripcion = data.descripcion
      }
    }, error => {
      this.toast.cambiarStatusToast( 'Lo sentimos, ocurrio un error al guardar la imagen', false, true, true )
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
      this.camara.reiniciarCamara()
      this.confCamara.mostrarModal = true
      return
    }

    // Subir archivo
    if (data.accion === AccionesItemCircularRectangular.SUBIR_ARCHIVO) {
      this.subirArchivoDeSelectorAlServidor(data.informacion.archivo[0])
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

      // Cuando la accion del album es actualizar
      if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
        return
      }

      return
    }

    // Cambiar a modo preview admin
    if (data.accion === AccionesItemCircularRectangular.CAMBIAR_A_MODO_ALBUM_PREVIEW_ADMIN) {
      if (this.accionAlbum === AccionAlbum.CREAR) {
        this.albumEnModoPreview = true
        // Avisar a los item para que pasen a modo preview admin
        this.itemsAlbum.forEach(item => {
          item.mostrarIconoExpandirFoto = true
          item.usoDelItem = UsoItemRectangular.RECALBUMPREVIEW
          item.mostrarIconoExpandirFoto = (this.accionAlbum === AccionAlbum.VISITA)
        })
      }

      if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
        return
      }

      return
    }

    // Editar descripcion
    if (data.accion === AccionesItemCircularRectangular.EDITAR_DESCRIPCION) {
      if (this.accionAlbum === AccionAlbum.CREAR) {
        this.idItemActivo = data.informacion
        this.itemsAlbum.forEach(item => {
          if (item.id === this.idItemActivo) {
            this.itemDescripcionActivo = item.descripcion
          } else {
            // Cambiar los demas items a estado dejar de editar descripcion
            item.mostrarCapaImagenSeleccionadaConBorde = false
          }
        })
        // Cambiar los demas
        return
      }

      if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
        return
      }

      return
    }

    // Dejar de editar descripcion
    if (data.accion === AccionesItemCircularRectangular.DEJAR_DE_EDITAR_DESCRIPCION) {
      if (this.accionAlbum === AccionAlbum.CREAR) {
        this.idItemActivo = ''
        this.itemDescripcionActivo = ''
        return
      }

      if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
        return
      }

      return
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

  obtenerMediaPorIdItem(id: string) : MediaModel {
    let media : MediaModel
    this.album.media.forEach((item, i) => {
      if (item._id === id) {
        media = item
      }
    })
    return media
  }

  // Actualizar la descripcion del item
  actualizarDescripcion() {
    if (this.accionAlbum === AccionAlbum.CREAR) {
      // Actualizar item
      this.itemsAlbum.forEach(item => {
        if (item.id === this.idItemActivo) {
          item.descripcion = this.itemDescripcionActivo
          item.mostrarCapaImagenSeleccionadaConBorde = false
        }
      })

      // Actualizar media
      this.album.media.forEach(item => {
        if (item._id === this.idItemActivo) {
          item.descripcion = this.itemDescripcionActivo
        }
      })

      this.idItemActivo = ''
      this.itemDescripcionActivo = ''
      return
    }

    if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
      return
    }

  }

  accionAppBarBack() {
    if (this.accionAlbum === AccionAlbum.CREAR) {
      // Si el album esta en modo preview
      if (this.albumEnModoPreview) {
        this.albumEnModoPreview = false
        this.itemsAlbum.forEach(item => {
          item.usoDelItem = UsoItemRectangular.RECALBUMMINI
          item.mostrarIconoExpandirFoto = false
          item.mostrarCapaImagenSeleccionadaConBorde = false
        })
        this.idItemActivo = ''
        this.itemDescripcionActivo = ''
        return
      }

      // Back
      if (this.entidad === CodigosCatalogoEntidad.PERFIL) {
        this.router.navigateByUrl(RutasLocales.REGISTRO.toString().replace(':codigoPerfil', this.codigo))
        return
      }
    }

    // Cuando el album es usado para actualizar
    if (this.accionAlbum === AccionAlbum.ACTUALIZAR) {
      return
    }
  }

  // Cuando el usuario da al boton de back, se debe almacenar el album en el storage
  guardarAlbum() {
    if (this.entidad === CodigosCatalogoEntidad.PERFIL) {
      this.perfilNegocio.insertarAlbunEnPerfil(this.codigo, this.album)
    }
  }

}

export enum AccionAlbum {
    VISITA = 'visita',
    CREAR = 'creando',
    ACTUALIZAR = 'actualizando',
}