import { GeneradorId } from './../../nucleo/servicios/generales/generador-id.service';
import { DialogoCompartido } from 'src/app/compartido/diseno/modelos/dialogo.interface';
import { RegistroService } from './../../nucleo/servicios/generales/registro.service'
import { DialogoInlineComponent } from './../../compartido/componentes/dialogo-inline/dialogo-inline.component'
import { ConfiguracionDialogoInline } from './../../compartido/diseno/modelos/dialogo-inline.interface'
import { TranslateService } from '@ngx-translate/core'
import { ConfiguracionToast } from './../../compartido/diseno/modelos/toast.interface'
import { CodigosCatalogoEntidad, AccionEntidad, AccionAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum'
import { AlbumModel } from '../../dominio/modelo/entidades/album.model'
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum'
import { CodigosCatalogosEstadoPerfiles } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-estado-perfiles.enun'
import { PerfilModel } from '../../dominio/modelo/perfil.model'
import { CuentaNegocio } from './../../dominio/logica-negocio/cuenta.negocio'
import { UsuarioModel } from '../../dominio/modelo/entidades/usuario.model'
import { RutasLocales } from './../../rutas-locales.enum'
import { CodigosCatalogoTipoPerfil } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum'
import { CatalogoTipoPerfilModel } from './../../dominio/modelo/catalogos/catalogo-tipo-perfil.model'
import { PerfilNegocio } from './../../dominio/logica-negocio/perfil.negocio'
import { UsoItemCircular, UsoItemRectangular } from './../../compartido/diseno/enums/uso-item-cir-rec.enum'
import { ItemCircularCompartido, ItemRectangularCompartido } from './../../compartido/diseno/modelos/item-cir-rec.interface'
import { UsoAppBar } from './../../compartido/diseno/enums/uso-appbar.enum'
import { Component, OnInit, Input, AfterViewInit, ViewChild, OnDestroy, HostListener } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InfoAccionBuscadorLocalidades } from './../../compartido/diseno/modelos/info-acciones-buscador-localidades.interface'
import { BuscadorModalComponent } from '../../compartido/componentes/buscador-modal/buscador-modal.component'
import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface'
import { InfoAccionSelector } from './../../compartido/diseno/modelos/info-accion-selector.interface'
import { ConfiguracionSelector } from './../../compartido/diseno/modelos/selector.interface'
import { PortadaGazeCompartido } from '../../compartido/diseno/modelos/portada-gaze.interface'
import { InfoAccionCirRec } from './../../compartido/diseno/modelos/info-accion-cir-rec.interface'
import { ConfiguracionAppbarCompartida } from './../../compartido/diseno/modelos/appbar.interface'
import { VariablesGlobales } from 'src/app/nucleo/servicios/generales/variables-globales.service'
import { AppbarComponent } from 'src/app/compartido/componentes/appbar/appbar.component'
import { PortadaGazeComponent } from 'src/app/compartido/componentes/portada-gaze/portada-gaze.component'
import { ItemRectanguloComponent } from 'src/app/compartido/componentes/item-rectangulo/item-rectangulo.component'
import { ItemCirculoComponent } from 'src/app/compartido/componentes/item-circulo/item-circulo.component'
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum'
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum'
import { TamanoPortadaGaze } from 'src/app/compartido/diseno/enums/tamano-portada-gaze.enum'
import { EstiloDelTextoServicio } from 'src/app/nucleo/servicios/diseno/estilo-del-texto.service'
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface'
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component'
import { InputCompartido } from 'src/app/compartido/diseno/modelos/input.interface'
import { UbicacionNegocio } from './../../dominio/logica-negocio/ubicacion.negocio'
import { SelectorComponent } from './../../compartido/componentes/selector/selector.component'
import { AccionesSelector } from 'src/app/compartido/diseno/enums/acciones-selector.enum'
import { ConfiguracionBuscadorModal } from '../../compartido/diseno/modelos/buscador-modal.interface'
import { AccionesBuscadorModal } from 'src/app/compartido/diseno/enums/acciones-buscador-localidades.enum'
import { AccionesItemCircularRectangular } from 'src/app/compartido/diseno/enums/acciones-item-cir-rec.enum'
import { TipoDialogo } from 'src/app/compartido/diseno/enums/tipo-dialogo.enum'
import { ToastComponent } from 'src/app/compartido/componentes/toast/toast.component';
import { Location } from '@angular/common'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appbar', { static: false }) appbar: AppbarComponent
  @ViewChild('portadaGaze', { static: false }) portada: PortadaGazeComponent
  @ViewChild('albumPerfil', { static: false }) albumPerfil: ItemCirculoComponent
  @ViewChild('albumGeneral', { static: false }) albumGeneral: ItemRectanguloComponent
  @ViewChild('selectorPaises', { static: false }) selectorPaises: SelectorComponent
  @ViewChild('buscadorLocalidades', { static: false }) buscadorLocalidades: BuscadorModalComponent
  @ViewChild('dialogoInline', { static: false }) dialogoInline: DialogoInlineComponent
  @ViewChild('toast', { static: false }) toast: ToastComponent

  // Utils
  public codigosCatalogoTipoPerfil = CodigosCatalogoTipoPerfil
  public codigosCatalogosEstadoPerfiles = CodigosCatalogosEstadoPerfiles

  // Parametros url
  public codigoPerfil: string // Codigo del perfil activo
  public accionEntidad: AccionEntidad // Accion formulario

  // Parametros internos - generales
  public mostrarCuerpoLoader: boolean // Oculta o muestra el loader
  public mostrarError: boolean // Indica si mostrar el error o no
  public mensajeError: string // Mensaje de error a mostrar

  // Parametros internos - configuracion de items y demas
  public confBotonReintentar: BotonCompartido // Boton de reintentar
  public confAppBar: ConfiguracionAppbarCompartida // Configuracion del appbar
  public confItemCir: ItemCircularCompartido // Configuracion item del circulo
  public confItemRec: ItemRectangularCompartido // Configuracion item del rectangulo
  public confSelector: ConfiguracionSelector // Configuracion del selector
  public confBuscador: ConfiguracionBuscadorModal // Configuracion buscador localidades
  public confToast: ConfiguracionToast  // Configuracion del toast
  public confBotonPago: BotonCompartido // Boton de pago
  public confBotonHibernar: BotonCompartido // Boton de hibernar
  public confBotonDesHibernar: BotonCompartido // Boton de deshibernar
  public confBotonEliminar: BotonCompartido // Boton de eliminar
  public confDialogoMasPerfiles: ConfiguracionDialogoInline // Dialogo compartido
  public confDialogoHibernar: DialogoCompartido // Dialogo de hibernar
  public confDialogoDesHibernar: DialogoCompartido // Dialogo de deshibernar
  public confDialogoEliminar: DialogoCompartido // Dialogo de eliminar

  public noCrearMasPerfiles: boolean // False aparece boton no, true aparece boton payment
  public registroForm: FormGroup // Formulario de registro
  public inputsForm: Array<InputCompartido> // Configuracion de los inputs
  public botonSubmit: BotonCompartido // Configuracion del boton compartido
  public tipoPerfil: CatalogoTipoPerfilModel // Perfil activo
  public usuario: UsuarioModel // Usuario activo
  public posPerfil: number // Posicion del perfil en la lista
  public perfil: PerfilModel // Model del perfil
  public perfilCreado: boolean // Indica que el perfil ha sido creado y se debe mostrar la info de pago

  // Utils
  public validadorNombreContacto: boolean
  public validadorEmail: boolean

  constructor(
    private translateService: TranslateService,
    private variablesGlobales: VariablesGlobales,
    public estiloDelTextoServicio: EstiloDelTextoServicio,
    private ubicacionNegocio: UbicacionNegocio,
    private rutaActual: ActivatedRoute,
    private router: Router,
    private perfilNegocio: PerfilNegocio,
    private cuentaNegocio: CuentaNegocio,
    private registroService: RegistroService,
    private _location: Location,
    private generadorId: GeneradorId
  ) {
    this.mostrarCuerpoLoader = false
    this.mostrarError = false
    this.mensajeError = ''

    this.perfilCreado = false
    this.noCrearMasPerfiles = false
    this.inputsForm = []
    this.validadorNombreContacto = false
    this.validadorEmail = false
  }

  ngOnInit(): void {
    this.variablesGlobales.mostrarMundo = false
    this.obtenerParametrosUrl()
    this.inicializarDataUsuario()
    this.inicializarControles()
    this.configurarAppBar()
    this.configurarInputs()
    this.configurarBoton()
    this.configurarAlbumPerfil()
    this.configurarAlbumGeneral()
    this.configurarSelectorPais()
    this.configurarBuscadorLocalidades()
    this.configurarToast()
    this.configurarBotonDePago()
    this.configurarDialogoPerfilNormal()
    this.configurarBotonesEstadoDelPerfil()
    this.configurarDialogoHibernar()
    this.configurarDialogoDesHibernar()
    this.configurarDialogoEliminar()

    // En caso la pagina sea recargada, se actualiza la informacion ingresada
    window.onbeforeunload = () => this.validarInformacionDeUsuarioAntesDeCambiarPagina()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.portada) {
        this.configurarPortada()
      }
      // Subscripcion a eventos de item
      this.subscripcionEventosEnItems()
    })
  }

  ngOnDestroy() {

  }

  // Escucha para el boton de back del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.registroService.validarPerfilParaDestruir(this.accionEntidad, this.codigoPerfil, this.tipoPerfil, this.perfil)
  }

  reintentar() {
    switch (this.accionEntidad) {
      case AccionEntidad.REGISTRO: break
      case AccionEntidad.CREAR:
        break
      case AccionEntidad.ACTUALIZAR:
        this.inicializarDataUsuario()
        break
      default: break;
    }
  }

  validarInformacionDeUsuarioAntesDeCambiarPagina() {
    switch (this.accionEntidad) {
      case AccionEntidad.REGISTRO:
        this.perfilNegocio.guardarInformacionPerfilSegunAccionRegistro(
          this.perfil,
          this.perfil.estado.codigo as CodigosCatalogosEstadoPerfiles,
          this.codigoPerfil,
          this.registroForm,
          this.confSelector.seleccionado,
          this.confBuscador.seleccionado,
          this.confBuscador.inputPreview.input.auxiliar,
        )
        break
      case AccionEntidad.CREAR:
        // Por definir
        break
      case AccionEntidad.ACTUALIZAR:
        this.perfilNegocio.guardarInformacionPerfilSegunAccionActualizar(
          this.perfil,
          this.registroForm,
          this.confSelector.seleccionado,
          this.confBuscador.seleccionado,
          this.confBuscador.inputPreview.input.auxiliar,
        )
        break
      default: break;
    }
  }

  // Cambia el valor de las capas del cuerpo
  cambiarValorCapasDelCuerpo(
    mostrarCuerpoLoader: boolean,
    mostrarError: boolean = false,
    mensajeError: string = ''
  ) {
    this.mostrarCuerpoLoader = mostrarCuerpoLoader
    this.mostrarError = mostrarError
    this.mensajeError = mensajeError
  }

  // Subscripcion a eventos de item
  subscripcionEventosEnItems() {
    if (this.buscadorLocalidades && this.selectorPaises) {
      this.buscadorLocalidades.pais = this.registroService.obtenerPaisSeleccionadoEnElPerfil(this.perfil)
      // Suscribirse a eventos de click en el selector de pais
      this.selectorPaises.evento.subscribe((info: InfoAccionSelector) => {
        if (info.accion === AccionesSelector.ABRIR_SELECTOR) {
          this.abrirSelectorPaises()
          return
        }
        if (info.accion === AccionesSelector.SELECCIONAR_ITEM) {
          console.log('Seleccionar item: ', info)
          this.buscadorLocalidades.pais = info.informacion
          this.confBuscador.seleccionado.codigo = ''
          this.confBuscador.seleccionado.nombre = ''
          this.confBuscador.inputPreview.input.valor = ''
          return
        }
      })

      // Suscribirse a eventos de click en el buscador de localidades
      this.buscadorLocalidades.evento.subscribe((info: InfoAccionBuscadorLocalidades) => {
        if (info.accion === AccionesBuscadorModal.ABRIR_BUSCADOR) {
          this.abrirBuscadorLocalidades()
          return
        }
        if (info.accion === AccionesBuscadorModal.REALIZAR_BUSQUEDA) {
          this.buscarLocalidades(info.informacion.pais, info.informacion.query)
          return
        }
      })
    }
  }

  // Reiniciar informacion
  reiniciarInformacionParaCambioDePerfil(codigoPerfil: string) {
    // Parametro url
    this.codigoPerfil = codigoPerfil
    // Parametros generales
    this.perfilCreado = false
    this.noCrearMasPerfiles = false
    this.inputsForm = []

    // Dependiendo de la accion
    switch (this.accionEntidad) {
      case AccionEntidad.REGISTRO:
        this.inicializarDataUsuario()
        this.inicializarControles()
        this.configurarAppBar()
        this.configurarInputs()
        this.configurarAlbumPerfil()
        this.configurarAlbumGeneral()
        this.configurarSelectorPais()
        this.configurarBuscadorLocalidades()
        this.configurarDialogoPerfilNormal()
        break
      case AccionEntidad.CREAR:
        this.inicializarControles()
        this.configurarInputs()
        this.configurarAlbumPerfil()
        this.configurarAlbumGeneral()
        this.configurarSelectorPais()
        this.configurarBuscadorLocalidades()
        break
      case AccionEntidad.ACTUALIZAR:
        this.inicializarControles()
        this.configurarInputs()
        this.configurarAlbumPerfil()
        this.configurarAlbumGeneral()
        this.configurarSelectorPais()
        this.configurarBuscadorLocalidades()
        break
      default: break;
    }

    // Reiniciar configuracion en componentes hijo
    this.appbar.configuracion = this.confAppBar
    this.appbar.inicializarTextos()
    this.albumPerfil.configuracion = this.confItemCir
    this.albumGeneral.configuracion = this.confItemRec
    if (this.selectorPaises && this.buscadorLocalidades) {
      this.selectorPaises.configuracion = this.confSelector
      this.buscadorLocalidades.configuracion = this.confBuscador
    }

    if (this.dialogoInline) {
      this.dialogoInline.configuracion = this.confDialogoMasPerfiles
    }
  }

  // Obtiene los parametros recibidos en la url
  obtenerParametrosUrl() {
    const { accionEntidad, codigoPerfil } = this.rutaActual.snapshot.params
    if ((accionEntidad && accionEntidad !== ':accionEntidad') && (codigoPerfil && codigoPerfil !== ':codigoPerfil')) {
      this.accionEntidad = accionEntidad
      this.codigoPerfil = codigoPerfil
    } else {
      console.warn('data invalida en parametros')
      this._location.back()
    }
  }

  // Validar si existe el usuario
  inicializarDataUsuario() {
    this.tipoPerfil = this.perfilNegocio.obtenerTipoPerfilSegunCodigo(this.codigoPerfil)

    if (this.tipoPerfil) {
      switch (this.accionEntidad) {
        case AccionEntidad.REGISTRO:
          this.perfil = this.perfilNegocio.validarPerfilModelDelSessionStorage(this.codigoPerfil)
          break
        case AccionEntidad.CREAR:
          this.perfil = this.perfilNegocio.inicializarPerfilActivoParaAccionCrear(this.tipoPerfil)
          console.log(this.perfil)
          break
        case AccionEntidad.ACTUALIZAR:
          this.cambiarValorCapasDelCuerpo(true)
          this.definirDataRegistroSegunAccionActualizar()
          break
        default:
          this._location.back()
          break
      }
    }
  }

  // Definir data del perfil para Accion actualizar
  async definirDataRegistroSegunAccionActualizar() {
    try {
      const id = this.perfilNegocio.obtenerIdDelPerfilSeleccionado()
      console.log(id)
      this.perfil = await this.perfilNegocio.validarOrigenPerfilActivo(id).toPromise()
      // Guardar el perfil activo en local storage
      this.perfilNegocio.guardarPerfilActivoEnLocalStorage(this.perfil) // Pendiente de mover a negocio
      this.reiniciarInformacionParaCambioDePerfil(this.codigoPerfil)
      this.cambiarValorCapasDelCuerpo(false)
    } catch (error) {
      console.log(error)
      this.cambiarValorCapasDelCuerpo(false, true, 'Lo sentimos ocurrio un error al obtener la informacion solicitada')
    }
  }

  // Inicializar controles para el formulario
  inicializarControles() {
    console.log(this.accionEntidad)
    switch (this.accionEntidad) {
      case AccionEntidad.REGISTRO:
        this.registroForm = this.registroService.inicializarControlesDelFormulario(this.perfil)
        break
      case AccionEntidad.CREAR:
        this.registroForm = this.registroService.inicializarControlesDelFormulario(this.perfil, false)
        break
      case AccionEntidad.ACTUALIZAR:
        this.registroForm = this.registroService.inicializarControlesDelFormulario(this.perfil, false)
        break
      default: break;
    }
  }

  // Accion atras appbar
  accionAtrasAppbar() {
    this.registroService.validarPerfilParaDestruir(this.accionEntidad, this.codigoPerfil, this.tipoPerfil, this.perfil)
    this._location.back()
  }

  // Configurar AppBar
  configurarAppBar() {
    const infoAppBar = this.registroService.obtenerParametrosDelAppBarSegunAccionEntidad(this.codigoPerfil, this.accionEntidad)

    this.confAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {        
        configuracion: {
          mostrar: infoAppBar.mostrarSearchBar,
          datos: {
            disable: true
          }
        },
        nombrePerfil: {
          mostrar: infoAppBar.mostrarNombrePerfil,
          llaveTexto: infoAppBar.llaveTextoNombrePerfil
        },
        mostrarDivBack: {
          icono: infoAppBar.mostrarIconoBack,
          texto: infoAppBar.mostrarTextoBack,
        },
        mostrarTextoHome: infoAppBar.mostrarTextoHome,
        subtitulo: {
          mostrar: true,
          llaveTexto: infoAppBar.llaveSubtitulo,
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      },
      accionAtras: () => {
        this.accionAtrasAppbar()
      }
    }
  }

  // Configurar inputs
  async configurarInputs() {
    this.inputsForm = this.registroService.configurarInputsDelFormulario(this.registroForm)
    if (this.inputsForm.length > 0) {
      this.inputsForm[0].placeholder = await this.translateService.get('nombreContacto').toPromise()
      this.inputsForm[1].placeholder = await this.translateService.get('nombre').toPromise()
      this.inputsForm[2].placeholder = await this.translateService.get('email').toPromise()
      this.inputsForm[3].placeholder = await this.translateService.get('contrasena').toPromise()
      this.inputsForm[4].placeholder = await this.translateService.get('direccion').toPromise()

      if (this.accionEntidad === AccionEntidad.CREAR || this.accionEntidad === AccionEntidad.ACTUALIZAR) {
        this.inputsForm[2].soloLectura = true
        this.inputsForm[3].soloLectura = true
      }

      this.inputsForm.forEach((input, pos) => {
        if (pos === 0) {
          input.validarCampo = {
            validar: true,
            validador: (data: any) => this.validarCampoEnInput(data, 0, false)
          }
        } else if (pos === 2) {
          input.validarCampo = {
            validar: true,
            validador: (data: any) => this.validarCampoEnInput(data, 1, false)
          }
        }
      })
    }
  }

  // Configurar boton
  async configurarBoton() {
    this.botonSubmit = {
      text: 'enviar',
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      colorTexto: ColorTextoBoton.AMARRILLO,
      tipoBoton: TipoBoton.TEXTO,
      enProgreso: false,
      ejecutar: () => {
        this.submitFormPerfil()
      }
    }

    const texto = await this.translateService.get('enviar').toPromise()
    this.botonSubmit.text = texto
  }

  // Configurar portada
  configurarPortada() {
    const configuracion: PortadaGazeCompartido = {
      tamano: TamanoPortadaGaze.PORTADACORTADA
    }
    this.portada.configuracionPortada = configuracion
  }

  // Configurar album perfil
  async configurarAlbumPerfil() {
    const album: AlbumModel = this.registroService.obtenerPortadaAlbumSegunTipoDelAlbum(this.perfil, CodigosCatalogoTipoAlbum.PERFIL)
    const infoPortada = this.registroService.definirDataItemSegunPortadaAlbum(album)

    this.confItemCir = {
      id: '',
      idInterno: this.generadorId.generarIdConSemilla(),
      usoDelItem: UsoItemCircular.CIRPERFIL,
      esVisitante: false,
      urlMedia: infoPortada.urlMedia,
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: infoPortada.mostrarBoton,
      mostrarLoader: infoPortada.mostrarLoader,
      textoBoton: '',
      eventoEnItem: (data: InfoAccionCirRec) => {
        this.eventoEnItem(data)
      },
      capaOpacidad: {
        mostrar: false
      }
    }

    const texto = await this.translateService.get('subirFotos').toPromise()
    this.confItemCir.textoBoton = texto
  }

  // Configurar album generarl
  async configurarAlbumGeneral() {
    let album: AlbumModel = this.registroService.obtenerPortadaAlbumSegunTipoDelAlbum(this.perfil, CodigosCatalogoTipoAlbum.GENERAL)
    const infoPortada = this.registroService.definirDataItemSegunPortadaAlbum(album)

    this.confItemRec = {
      id: '',
      idInterno: this.generadorId.generarIdConSemilla(),
      usoDelItem: UsoItemRectangular.RECPERFIL,
      esVisitante: false,
      urlMedia: infoPortada.urlMedia,
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: infoPortada.mostrarBoton,
      mostrarLoader: infoPortada.mostrarLoader,
      textoBoton: '',
      descripcion: '',
      mostrarIconoExpandirFoto: false,
      textoCerrarEditarDescripcion: '',
      mostrarCapaImagenSeleccionadaConBorde: false,
      eventoEnItem: (data: InfoAccionCirRec) => {
        this.eventoEnItem(data)
      },
      capaOpacidad: {
        mostrar: false
      },
      esBotonUpload: false
    }

    const texto = await this.translateService.get('subirFotos').toPromise()
    this.confItemRec.textoBoton = texto
  }

  // Configurar selectores
  configurarSelectorPais() {
    // Definir direccion
    let item: ItemSelector = { codigo: '', nombre: '', auxiliar: '' }

    if (this.perfil) {
      item = this.registroService.obtenerInformacionDeUbicacion(this.perfil.direcciones)
    }

    // Asignar el pais, al buscador de localidades
    if (this.buscadorLocalidades) {
      this.buscadorLocalidades.pais = item
    }

    this.confSelector = {
      tituloSelector: 'Choose the country',
      mostrarModal: false,
      inputPreview: {
        mostrar: true,
        input: {
          valor: item.nombre,
          placeholder: 'Country:',
        }
      },
      seleccionado: item,
      elegibles: [],
      cargando: {
        mostrar: false
      },
      error: {
        mostrarError: false,
        contenido: '',
        tamanoCompleto: false
      }
    }
  }

  configurarBuscadorLocalidades() {
    // Definir direccion
    let item: ItemSelector = { codigo: '', nombre: '', auxiliar: '' }
    if (this.perfil) {
      item = this.registroService.obtenerInformacionDeUbicacion(this.perfil.direcciones, false)
    }

    this.confBuscador = {
      seleccionado: item,
      inputPreview: {
        mostrar: true,
        input: {
          placeholder: 'Post Code:',
          valor: (item.nombre.length > 0 && item.auxiliar.length > 0) ? item.nombre + ' (CP: ' + item.auxiliar + ')' : '',
          auxiliar: item.auxiliar,
        }
      },
      mostrarModal: false,
      inputBuscador: {
        valor: '',
        placeholder: 'Busca tu localidad',
      },
      resultado: {
        mostrarElegibles: false,
        mostrarCargando: false,
        error: {
          mostrarError: false,
          contenido: '',
          tamanoCompleto: false
        },
        items: []
      }
    }
  }

  configurarToast() {
    this.confToast = {
      texto: '',
      mostrarToast: false,
      mostrarLoader: false,
      cerrarClickOutside: true,
      intervalo: 5
    }
  }

  async configurarBotonDePago() {
    this.confBotonPago = {
      text: '',
      tipoBoton: TipoBoton.TEXTO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      colorTexto: ColorTextoBoton.AMARRILLO,
      enProgreso: false,
      ejecutar: () => {
        this.router.navigateByUrl(RutasLocales.METODO_PAGO)
      }
    }

    const texto = await this.translateService.get('pago').toPromise()
    this.confBotonPago.text = texto
  }

  async configurarDialogoPerfilNormal() {
    // Configurar el dialogo
    this.confDialogoMasPerfiles = {
      descripcion: '',
      listaBotones: []
    }

    // Texto descripcion
    const descripcion = await this.translateService.get('dialogoCrearPerfil').toPromise()
    this.confDialogoMasPerfiles.descripcion = descripcion
    // Perfiles sobrantes y boton no o boton pago
    if (this.perfil) {
      this.determinarPerfilesSobrantes()
    }
  }

  async inicializarBotonesSobrantes(
    perfilUno: {
      llave: string,
      codigo: CodigosCatalogoTipoPerfil
    },
    perfilDos: {
      llave: string,
      codigo: CodigosCatalogoTipoPerfil
    },
  ) {
    this.confDialogoMasPerfiles.listaBotones.push({
      text: perfilUno.llave,
      tipoBoton: TipoBoton.TEXTO,
      tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
      colorTexto: ColorTextoBoton.AZUL,
      enProgreso: false,
      ejecutar: () => {
        this.reiniciarInformacionParaCambioDePerfil(perfilUno.codigo)
        this.registroService.navegarAlRegistro(this.accionEntidad, perfilUno.codigo, this.router)
      },
    })
    this.confDialogoMasPerfiles.listaBotones.push({
      text: perfilDos.llave,
      tipoBoton: TipoBoton.TEXTO,
      tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
      colorTexto: ColorTextoBoton.ROJO,
      enProgreso: false,
      ejecutar: () => {
        this.reiniciarInformacionParaCambioDePerfil(perfilDos.codigo)
        this.registroService.navegarAlRegistro(this.accionEntidad, perfilDos.codigo, this.router)
      },
    })

    const botonPosCero = await this.translateService.get(perfilUno.llave).toPromise()
    const botonPosUno = await this.translateService.get(perfilDos.llave).toPromise()
    this.confDialogoMasPerfiles.listaBotones[0].text = botonPosCero
    this.confDialogoMasPerfiles.listaBotones[1].text = botonPosUno
    // Determinar boton no o boton payment
    this.determinarBotonNoBotonPaymente(-1)
  }

  async determinarPerfilesSobrantes() {
    switch (this.perfil.tipoPerfil.codigo) {
      case CodigosCatalogoTipoPerfil.CLASSIC:
        this.inicializarBotonesSobrantes(
          {
            llave: 'sustituto',
            codigo: CodigosCatalogoTipoPerfil.SUBSTITUTE
          },
          {
            llave: 'ludico',
            codigo: CodigosCatalogoTipoPerfil.PLAYFUL
          },
        )
        break
      case CodigosCatalogoTipoPerfil.PLAYFUL:
        this.inicializarBotonesSobrantes(
          {
            llave: 'clasico',
            codigo: CodigosCatalogoTipoPerfil.CLASSIC
          },
          {
            llave: 'sustituto',
            codigo: CodigosCatalogoTipoPerfil.SUBSTITUTE
          },
        )
        break
      case CodigosCatalogoTipoPerfil.SUBSTITUTE:
        this.inicializarBotonesSobrantes(
          {
            llave: 'clasico',
            codigo: CodigosCatalogoTipoPerfil.CLASSIC
          },
          {
            llave: 'ludico',
            codigo: CodigosCatalogoTipoPerfil.PLAYFUL
          },
        )
        break
      case CodigosCatalogoTipoPerfil.GROUP:
        // Para grupo no hay mas perfiles
        break
      default:
        // No hay mas perfiles
        break
    }
  }

  async determinarBotonNoBotonPaymente(pos: number) {
    const configuracion: BotonCompartido = {
      text: 'no',
      tipoBoton: TipoBoton.TEXTO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      colorTexto: ColorTextoBoton.AMARRILLO,
      enProgreso: false,
      ejecutar: () => { },
    }
    // Se inserta el boton
    if (pos < 0) {
      this.confDialogoMasPerfiles.listaBotones.push(configuracion)
    } else {
      this.confDialogoMasPerfiles.listaBotones[pos] = configuracion
    }

    if (!this.noCrearMasPerfiles) {
      // Si es falso, aparece boton no.
      const texto = await this.translateService.get('no').toPromise()
      this.confDialogoMasPerfiles.listaBotones[2].text = texto
      this.confDialogoMasPerfiles.listaBotones[2].ejecutar = () => {
        this.noCrearMasPerfiles = true
        this.determinarBotonNoBotonPaymente(2)
      }
    } else {
      // Si es verdadero aparece boton payment
      // Si es falso, aparece boton no.
      const texto = await this.translateService.get('pago').toPromise()
      this.confDialogoMasPerfiles.listaBotones[2].text = texto
      this.confDialogoMasPerfiles.listaBotones[2].ejecutar = () => {
        this.router.navigateByUrl(RutasLocales.METODO_PAGO)
      }
    }
  }

  async configurarBotonesEstadoDelPerfil() {
    this.confBotonHibernar = {
      text: 'hibernar',
      tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
      colorTexto: ColorTextoBoton.ROJO,
      tipoBoton: TipoBoton.TEXTO,
      enProgreso: false,
      ejecutar: () => {
        this.confDialogoHibernar.mostrarDialogo = true
      }
    }

    this.confBotonDesHibernar = {
      text: 'deshibernar',
      tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
      colorTexto: ColorTextoBoton.ROJO,
      tipoBoton: TipoBoton.TEXTO,
      enProgreso: false,
      ejecutar: () => {
        this.confDialogoDesHibernar.mostrarDialogo = true
      }
    }

    this.confBotonEliminar = {
      text: 'suprimir',
      tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
      colorTexto: ColorTextoBoton.AZUL,
      tipoBoton: TipoBoton.TEXTO,
      enProgreso: false,
      ejecutar: () => {
        this.confDialogoEliminar.mostrarDialogo = true
      }
    }

    const textoHibernar = await this.translateService.get('hibernar').toPromise()
    this.confBotonHibernar.text = textoHibernar

    const textoEliminar = await this.translateService.get('suprimir').toPromise()
    this.confBotonEliminar.text = textoEliminar
  }

  async configurarDialogoHibernar() {
    this.confDialogoHibernar = {
      mostrarDialogo: false,
      descripcion: '',
      tipo: TipoDialogo.CONFIRMACION,
      completo: true,
      listaAcciones: [
        {
          text: 'si',
          tipoBoton: TipoBoton.TEXTO,
          colorTexto: ColorTextoBoton.ROJO,
          tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
          enProgreso: false,
          ejecutar: () => {
            this.confDialogoHibernar.mostrarDialogo = false
            this.hibernarPerfil()
          }
        },
        {
          text: 'no',
          tipoBoton: TipoBoton.TEXTO,
          colorTexto: ColorTextoBoton.AMARRILLO,
          tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
          enProgreso: false,
          ejecutar: () => {
            this.confDialogoHibernar.mostrarDialogo = false
          }
        }
      ]
    }

    this.confDialogoHibernar.descripcion = await this.translateService.get('hibernarPerfil').toPromise()
    this.confDialogoHibernar.listaAcciones[0].text = await this.translateService.get('si').toPromise()
    this.confDialogoHibernar.listaAcciones[1].text = await this.translateService.get('no').toPromise()
  }

  async configurarDialogoDesHibernar() {
    this.confDialogoDesHibernar = {
      mostrarDialogo: false,
      descripcion: '',
      tipo: TipoDialogo.CONFIRMACION,
      completo: true,
      listaAcciones: [
        {
          text: 'si',
          tipoBoton: TipoBoton.TEXTO,
          colorTexto: ColorTextoBoton.ROJO,
          tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
          enProgreso: false,
          ejecutar: () => {
            this.confDialogoDesHibernar.mostrarDialogo = false
            this.desHibernarPerfil()
          }
        },
        {
          text: 'no',
          tipoBoton: TipoBoton.TEXTO,
          colorTexto: ColorTextoBoton.AMARRILLO,
          tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
          enProgreso: false,
          ejecutar: () => {
            this.confDialogoDesHibernar.mostrarDialogo = false
          }
        }
      ]
    }

    this.confDialogoDesHibernar.descripcion = await this.translateService.get('deshibernar').toPromise()
    this.confDialogoDesHibernar.listaAcciones[0].text = await this.translateService.get('si').toPromise()
    this.confDialogoDesHibernar.listaAcciones[1].text = await this.translateService.get('no').toPromise()
  }

  async configurarDialogoEliminar() {
    this.confDialogoEliminar = {
      mostrarDialogo: false,
      descripcion: '',
      tipo: TipoDialogo.CONFIRMACION,
      completo: true,
      listaAcciones: [
        {
          text: 'si',
          tipoBoton: TipoBoton.TEXTO,
          colorTexto: ColorTextoBoton.ROJO,
          tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
          enProgreso: false,
          ejecutar: () => {
            this.confDialogoEliminar.mostrarDialogo = false
            this.eliminarPerfil()
          }
        },
        {
          text: 'no',
          tipoBoton: TipoBoton.TEXTO,
          colorTexto: ColorTextoBoton.AMARRILLO,
          tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
          enProgreso: false,
          ejecutar: () => {
            this.confDialogoEliminar.mostrarDialogo = false
          }
        }
      ]
    }
    this.confDialogoEliminar.descripcion = await this.translateService.get('suprimirPerfil').toPromise()
    this.confDialogoEliminar.listaAcciones[0].text = await this.translateService.get('si').toPromise()
    this.confDialogoEliminar.listaAcciones[1].text = await this.translateService.get('no').toPromise()
  }

  //
  mostrarBotonesEstadoPerfil() {
    let estato = false
    if (this.accionEntidad === AccionEntidad.ACTUALIZAR) {
      return true
    }
  }

  // Click en input pais
  abrirSelectorPaises() {
    this.selectorPaises.configuracion.cargando.mostrar = true
    this.selectorPaises.configuracion.mostrarModal = true

    this.ubicacionNegocio.obtenerCatalogoPaisesParaSelector()
      .subscribe(res => {
        this.ubicacionNegocio.guardarPaisesDelSelectorEnLocalStorage(res)
        this.selectorPaises.configuracion.elegibles = res
        this.selectorPaises.configuracion.cargando.mostrar = false

        if (this.selectorPaises.configuracion.elegibles.length === 0) {
          this.selectorPaises.mostrarError('Problemas al obtener los datos solicitados')
        }
      }, error => {
        this.selectorPaises.mostrarError('Lo sentimos, ocurrio un error al obtener la informacion')
      })
  }

  // Click en input localidades
  abrirBuscadorLocalidades() {
    if (!this.buscadorLocalidades.pais || this.buscadorLocalidades.pais.codigo.length === 0) {
      this.buscadorLocalidades.mostrarError('Error, debes seleccionar el pais antes de buscar una localidad', true, true)
    }
    this.buscadorLocalidades.configuracion.mostrarModal = true
  }

  // Buscador localidades
  buscarLocalidades(pais: string, query: string) {
    this.buscadorLocalidades.mostrarError('', false)
    this.buscadorLocalidades.configuracion.resultado.mostrarCargando = true
    this.ubicacionNegocio.obtenerCatalogoLocalidadesPorNombrePorPaisParaSelector(pais, query)
      .subscribe(data => {
        this.buscadorLocalidades.mostrarElegibles((Array.isArray(data)) ? data : [data])
        this.buscadorLocalidades.configuracion.resultado.mostrarCargando = false
      }, error => {
        this.buscadorLocalidades.mostrarError('Ocurrio un error al procesar tu solicitud, intenta mas tarde', true)
      })
  }

  // Navegar a ruta de album
  irAlAlbumConParametros(
    tipoAlbum: CodigosCatalogoTipoAlbum,
    ruta: RutasLocales,
    codigo: string,
    entidad: CodigosCatalogoEntidad,
    accionEntidad: AccionEntidad,
    titulo: string,
    accionAlbum: AccionAlbum
  ) {
    // Validar el album
    this.registroService.validarAlbumSegunAccionEntidad(tipoAlbum, this.perfil, this.accionEntidad)
    // this.perfilNegocio.validarAlbumSegunTipo(tipoAlbum, this.perfil)
    // Definir parametros de la url
    let rutaAux = ruta.toString()
    rutaAux = rutaAux.replace(':codigo', codigo)
    rutaAux = rutaAux.replace(':entidad', entidad)
    rutaAux = rutaAux.replace(':accionEntidad', accionEntidad)
    rutaAux = rutaAux.replace(':titulo', titulo)
    rutaAux = rutaAux.replace(':accionAlbum', accionAlbum)

    this.validarInformacionDeUsuarioAntesDeCambiarPagina()
    this.router.navigateByUrl(rutaAux, { skipLocationChange: false })
  }

  // Eventos de click en items
  eventoEnItem(data: InfoAccionCirRec) {
    const userName: string = this.registroForm.value.nombre && this.registroForm.value.nombre.length > 0 ? this.registroForm.value.nombre : 'Lorem ipsum dolor'
    const accionAlbum: AccionAlbum = this.registroService.definirAccionDelAlbumSegunAccionEntidad(CodigosCatalogoEntidad.PERFIL, this.accionEntidad)

    if (data.accion === AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_PERFIL) {
      this.irAlAlbumConParametros(
        CodigosCatalogoTipoAlbum.PERFIL,
        RutasLocales.ALBUM_PERFIL,
        this.codigoPerfil,
        CodigosCatalogoEntidad.PERFIL,
        this.accionEntidad,
        userName,
        accionAlbum,
      )
      return
    }

    if (data.accion === AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_GENERAL) {
      this.irAlAlbumConParametros(
        CodigosCatalogoTipoAlbum.GENERAL,
        RutasLocales.ALBUM_GENERAL,
        this.codigoPerfil,
        CodigosCatalogoEntidad.PERFIL,
        this.accionEntidad,
        userName,
        accionAlbum,
      )
      return
    }
  }

  // Determinar si se debe validar o no
  ejecutarValidadorDeCampo(valor: string, pos: number): boolean {
    let res = true
    if (this.accionEntidad === AccionEntidad.ACTUALIZAR) {
      if (pos === 0) {
        res = (!(valor === this.perfil.nombreContacto))
      }
    }
    return res
  }

  // Validar campo
  async validarCampoEnInput(
    data: any,
    tipo: number,
    forzarSubmit: boolean = true
  ) {
    if (data.texto && data.id && data.texto.length >= 3) {
      try {
        let test: any
        if (tipo === 0) { // Validar nombre de contacto
          if (this.ejecutarValidadorDeCampo(data.texto, 0)) {
            test = await this.perfilNegocio.validarNombreDeContactoUnico(data.texto).toPromise()
            if (test) {
              this.validadorNombreContacto = true
            }
          } else {
            this.validadorNombreContacto = true
          }
        } else if (tipo === 1) {
          test = await this.cuentaNegocio.validarEmailUnico(data.texto).toPromise()
          if (test) { // Validar email
            this.validadorEmail = true
          }
        }
        if ((this.validadorNombreContacto && this.validadorEmail) || forzarSubmit) {
          this.submitFormPerfil()
        }
      } catch (error) {
        let mensaje = ''
        if (tipo === 0) {
          this.validadorNombreContacto = false
          mensaje = 'Nombre de contacto no disponible'
        } else if (tipo === 1) {
          this.validadorEmail = false
          mensaje = 'Email ya registrado'
        }
        // Asignar el error
        this.inputsForm.forEach(item => {
          if (item.id === data.id) {
            item.errorPersonalizado = mensaje
          }
        })
      }
    }
  }

  // submit para el registro
  submitRegistro() {
    if (!this.validadorEmail || !this.validadorNombreContacto) {
      if (this.inputsForm.length > 0) {
        this.validarCampoEnInput({
          id: this.inputsForm[0].id,
          texto: this.inputsForm[0].data.value
        }, 0)
        this.validarCampoEnInput({
          id: this.inputsForm[2].id,
          texto: this.inputsForm[2].data.value
        }, 1)
      }
    } else {
      let error = true
      this.botonSubmit.enProgreso = true

      if (this.registroForm.valid) {
        if (this.confSelector.seleccionado && this.confSelector.seleccionado.codigo.length > 0) {
          if (this.confBuscador.seleccionado && this.confBuscador.seleccionado.codigo.length > 0) {
            this.perfilNegocio.guardarInformacionPerfilSegunAccionRegistro(
              this.perfil,
              CodigosCatalogosEstadoPerfiles.PERFIL_ACTIVO,
              this.codigoPerfil,
              this.registroForm,
              this.confSelector.seleccionado,
              this.confBuscador.seleccionado,
              this.confBuscador.inputPreview.input.auxiliar,
            )
            this.perfilCreado = true
            this.botonSubmit.enProgreso = false
            error = false
          }
        }
      }

      if (error) {
        this.botonSubmit.enProgreso = false
        this.toast.abrirToast('Existen campos incompletos o mal llenados')
      }
    }
  }

  // Submit actualizar
  submitActualizar() {
    if (!this.validadorNombreContacto) {
      if (this.inputsForm.length > 0) {
        this.validarCampoEnInput({
          id: this.inputsForm[0].id,
          texto: this.inputsForm[0].data.value,
        }, 0)
      }
    } else {
      let errorEnCampos = true
      this.toast.abrirToast('Espere por favor...', true)
      if (this.confSelector.seleccionado && this.confSelector.seleccionado.codigo.length > 0) {
        if (this.confBuscador.seleccionado && this.confBuscador.seleccionado.codigo.length > 0) {
          errorEnCampos = false

          this.perfilNegocio.guardarInformacionPerfilSegunAccionActualizar(
            this.perfil,
            this.registroForm,
            this.confSelector.seleccionado,
            this.confBuscador.seleccionado,
            this.confBuscador.inputPreview.input.auxiliar,
          )

          const perfilActivo: PerfilModel = this.perfilNegocio.obtenerPerfilActivoDelLocalStorage()
          
          this.perfilNegocio.actualizarPerfil(perfilActivo).subscribe(perfil => {
            console.warn(perfil)
            this.perfil = perfil
            this.perfilNegocio.actualizarDataDelPerfilEnElUsuarioDelLocalStorage(this.perfil)
            this.perfilNegocio.guardarPerfilActivoEnLocalStorage(this.perfil)
            this.toast.abrirToast('Perfil actualizado con exito')
          }, error => {
            console.error(error)
            this.toast.abrirToast('Lo sentimos, ocurrio un error al actualizar el perfil')
          })
        }
      }

      if (errorEnCampos) {
        this.toast.abrirToast('Existen campos incompletos o mal llenados')
      }
    }
  }

  // Submit para Accion Crear
  submitCrear() {
    if (!this.validadorNombreContacto) {
      if (this.inputsForm.length > 0) {
        this.validarCampoEnInput({
          id: this.inputsForm[0].id,
          texto: this.inputsForm[0].data.value,
        }, 0)
      }
    } else {
      let errorEnCampos = true
      this.toast.abrirToast('Espere por favor...', true)

      if (this.confSelector.seleccionado && this.confSelector.seleccionado.codigo.length > 0) {
        if (this.confBuscador.seleccionado && this.confBuscador.seleccionado.codigo.length > 0) {
          
          this.perfilNegocio.guardarInformacionPerfilSegunAccionCrear(
            this.perfil,
            this.registroForm,
            this.confSelector.seleccionado,
            this.confBuscador.seleccionado,
            this.confBuscador.inputPreview.input.auxiliar,
            CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR
          )

          const perfilActivo: PerfilModel = this.perfilNegocio.obtenerPerfilActivoDelLocalStorage()
          const usuario: UsuarioModel = this.cuentaNegocio.obtenerUsuarioDelLocalStorage()
          errorEnCampos = false
          
          // Hacer peticion al api
          this.perfilNegocio.crearPerfilEnElUsuario(perfilActivo, { id: usuario.id }).subscribe(data => {
            console.warn(data)
            this.perfil = data
            this.perfilNegocio.guardarPerfilActivoEnLocalStorage(this.perfil)
            this.perfilNegocio.insertarPerfilEnElUsuario(this.perfil)
            this.toast.abrirToast('Perfil creado con exito')
          }, error => {
            console.log(error)
            this.toast.abrirToast('Lo sentimos, ocurrio un error al actualizar el perfil')
          })              
        }
      }

      if (errorEnCampos) {
        this.botonSubmit.enProgreso = false
        this.toast.abrirToast('Existen campos incompletos o mal llenados')
      }
    }
  }

  // Submit formulario
  submitFormPerfil() {
    switch (this.accionEntidad) {
      case AccionEntidad.REGISTRO:
        this.submitRegistro()
        break
      case AccionEntidad.CREAR:
        this.submitCrear()
        break
      case AccionEntidad.ACTUALIZAR:
        this.submitActualizar()
        break
      default:
        break
    }
  }

  // Hibernar perfil
  hibernarPerfil() {
    this.eliminarHibernarElPerfil(CodigosCatalogosEstadoPerfiles.PERFIL_HIBERNADO)
  }

  // Deshibernar perfil
  desHibernarPerfil() {
    const perfil: PerfilModel = {
      _id: this.perfil._id
    }

    this.toast.abrirToast('Espere por favor...', true)
    this.perfilNegocio.activarPerfil(perfil).subscribe(data => {
      console.log(data)
      this.perfil.estado.codigo = CodigosCatalogosEstadoPerfiles.PERFIL_ACTIVO
      this.perfilNegocio.guardarPerfilActivoEnLocalStorage(this.perfil)
      this.perfilNegocio.actualizarDataDelPerfilEnElUsuarioDelLocalStorage(this.perfil)
      this.toast.abrirToast('Perfil actulizado correctamente')
    }, error => {
      console.log(error)
      this.toast.abrirToast('Lo sentimos, ocurrio un error al actualizar el perfil')
    })
  }

  // Eliminar perfil
  eliminarPerfil() {
    this.eliminarHibernarElPerfil(CodigosCatalogosEstadoPerfiles.PERFIL_ELIMINADO)
  }

  eliminarHibernarElPerfil(codigoEstado: CodigosCatalogosEstadoPerfiles) {
    const perfil: PerfilModel = {
      _id: this.perfil._id,
      estado: {
        codigo: codigoEstado
      }
    }

    this.toast.abrirToast('Espere por favor...', true)
    this.perfilNegocio.eliminarHibernarElPerfil(perfil).subscribe(data => {
      this.perfil.estado.codigo = perfil.estado.codigo
      this.perfilNegocio.guardarPerfilActivoEnLocalStorage(this.perfil)
      if (codigoEstado === CodigosCatalogosEstadoPerfiles.PERFIL_HIBERNADO) {
        this.perfilNegocio.actualizarDataDelPerfilEnElUsuarioDelLocalStorage(this.perfil)
        this.toast.abrirToast('Perfil actualizado con exito')
      } else if (codigoEstado === CodigosCatalogosEstadoPerfiles.PERFIL_ELIMINADO) {
        this.perfilNegocio.eliminarDataDelPerfilEnElUsuarioDelLocalStorage(this.perfil)
        this._location.back()
      }
    }, error => {
      console.log(error)
      this.toast.abrirToast('Lo sentimos, ocurrio un error al actualizar el perfil')
    })
  }


}