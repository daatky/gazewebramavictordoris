import { GeneradorId } from './../../nucleo/servicios/generales/generador-id.service';
import { DialogoCompartido } from 'src/app/compartido/diseno/modelos/dialogo.interface';
import { RegistroService } from './../../nucleo/servicios/generales/registro.service'
import { DialogoInlineComponent } from './../../compartido/componentes/dialogo-inline/dialogo-inline.component'
import { ConfiguracionDialogoInline } from './../../compartido/diseno/modelos/dialogo-inline.interface'
import { TranslateService } from '@ngx-translate/core'
import { ConfiguracionToast } from './../../compartido/diseno/modelos/toast.interface'
import { CodigosCatalogoEntidad, AccionEntidad, AccionAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum'
import { AlbumModel } from './../../dominio/modelo/album.model'
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum'
import { CodigosCatalogosEstadoPerfiles } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-estado-perfiles.enun'
import { PerfilModel } from './../../dominio/modelo/perfil.model'
import { CuentaNegocio } from './../../dominio/logica-negocio/cuenta.negocio'
import { UsuarioModel } from './../../dominio/modelo/usuario.model'
import { RutasLocales } from './../../rutas-locales.enum'
import { CodigosCatalogoTipoPerfil } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum'
import { CatalogoTipoPerfilModel } from './../../dominio/modelo/catalogo-tipo-perfil.model'
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
import { EstiloErrorInput } from 'src/app/compartido/diseno/enums/estilo-error-input.enum'
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

  // CodigosTipoPerfil
  public codigosCatalogoTipoPerfil = CodigosCatalogoTipoPerfil

  // Parametros url
  public codigoPerfil: string // Codigo del perfil activo
  public accionEntidad: AccionEntidad // Accion formulario

  // Parametros internos
  public confAppBar: ConfiguracionAppbarCompartida // Configuracion del appbar
  public confItemCir: ItemCircularCompartido // Configuracion item del circulo
  public confItemRec: ItemRectangularCompartido // Configuracion item del rectangulo
  public confSelector: ConfiguracionSelector // Configuracion del selector
  public confBuscador: ConfiguracionBuscadorModal // Configuracion buscador localidades
  public confToast: ConfiguracionToast  // Configuracion del toast
  public confBotonPago: BotonCompartido // Boton de pago
  public confBotonHibernar: BotonCompartido // Boton de hibernar
  public confBotonEliminar: BotonCompartido // Boton de eliminar
  public confDialogoMasPerfiles: ConfiguracionDialogoInline // Dialogo compartido
  public confDialogoHibernar: DialogoCompartido // Dialogo de hibernar
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
  public validadorExternoDelFormulario: boolean
  public validadoresEjecutados: boolean

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
    this.perfilCreado = false
    this.noCrearMasPerfiles = false
    this.inputsForm = []
    // this.validadorExternoDelFormulario = true
    this.validadoresEjecutados = false
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
    this.configurarDialogoEliminar()

    // En caso la pagina sea recargada, se actualiza la informacion ingresada
    window.onbeforeunload = () => this.guardarInformacionPerfil(this.perfil.estado.codigo as CodigosCatalogosEstadoPerfiles)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.configurarPortada()
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
    })
  }

  ngOnDestroy() {

  }

  // Reiniciar informacion
  reiniciarInformacionParaCambioDePerfil(codigoPerfil: string) {
    // Parametro url
    this.codigoPerfil = codigoPerfil
    // Parametros generales
    this.perfilCreado = false
    this.noCrearMasPerfiles = false
    this.inputsForm = []

    // Metodos para componenentes y demas
    this.inicializarDataUsuario()
    this.inicializarControles()
    this.configurarAppBar()
    this.configurarInputs()
    this.configurarAlbumPerfil()
    this.configurarAlbumGeneral()
    this.configurarSelectorPais()
    this.configurarBuscadorLocalidades()
    this.configurarDialogoPerfilNormal()

    // Reiniciar configuracion en componentes hijo
    this.appbar.configuracion = this.confAppBar
    this.appbar.inicializarTextos()
    this.albumPerfil.configuracion = this.confItemCir
    this.albumGeneral.configuracion = this.confItemRec
    if (this.selectorPaises && this.buscadorLocalidades) {
      this.selectorPaises.configuracion = this.confSelector
      this.buscadorLocalidades.configuracion = this.confBuscador
    }
    this.dialogoInline.configuracion = this.confDialogoMasPerfiles
  }

  // Escucha para el boton de back del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (this.perfil) {
      this.cuentaNegocio.validarEstadoPerfilParaDestruir(this.codigoPerfil, this.perfil.estado.codigo as CodigosCatalogosEstadoPerfiles)
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
    console.log(this.codigoPerfil)
    if (this.tipoPerfil) {
      switch (this.accionEntidad) {
        case AccionEntidad.REGISTRO:
          this.perfil = this.perfilNegocio.validarPerfilModelDelSessionStorage(this.codigoPerfil)
          break
        case AccionEntidad.CREAR:
          // Crear el perfil
          // this.tipoPerfil = this.perfilNegocio.obtenerTipoPerfilSegunCodigo(this.codigoPerfil)
          // this.perfil = this.perfilNegocio.validarPerfilModel(this.codigoPerfil)
          break
        case AccionEntidad.ACTUALIZAR:
          // Obtener el perfil del api, segun id en codigoPerfil
          break
        default:
          this._location.back()
          break
      }
    }

    // if (!this.tipoPerfil || !this.perfil) {
    //   this.router.navigateByUrl(RutasLocales.MENU_PERFILES)
    // }
  }

  // Inicializar controles para el formulario
  inicializarControles() {
    if (this.perfil) {
      this.registroForm = this.registroService.inicializarControlesDelFormulario(this.perfil)
    }
  }

  // Accion atras appbar
  accionAtrasAppbar() {
    if (this.perfil && this.tipoPerfil) {
      this.cuentaNegocio.validarEstadoPerfilParaDestruir(this.codigoPerfil, this.perfil.estado.codigo as CodigosCatalogosEstadoPerfiles)
    }
    this._location.back()
  }

  // Configurar AppBar
  configurarAppBar() {
    const infoAppBar = this.registroService.obtenerParametrosDelAppBarSegunAccionEntidad(this.codigoPerfil, this.accionEntidad)

    this.confAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        mostrarSearchBar: infoAppBar.mostrarSearchBar,
        nombrePerfil: {
          mostrar: infoAppBar.mostrarNombrePerfil,
          llaveTexto: infoAppBar.llaveTextoNombrePerfil
        },
        mostrarDivBack: true,
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

      this.inputsForm.forEach((input, pos) => {
        if (pos === 0) {
          input.validarCampo = {
            validar: true,
            validador: (data: any) => this.validarCampoEnInput(data, 0)
          }
        } else if (pos === 2) {
          input.validarCampo = {
            validar: true,
            validador: (data: any) => this.validarCampoEnInput(data, 1)
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
      cerrarClickOutside: true
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
    // Substituto
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
    // Ludico
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
    this.perfilNegocio.validarAlbumSegunTipo(tipoAlbum, this.perfil)
    // Definir parametros de la url
    let rutaAux = ruta.toString()
    rutaAux = rutaAux.replace(':codigo', codigo)
    rutaAux = rutaAux.replace(':entidad', entidad)
    rutaAux = rutaAux.replace(':accionEntidad', accionEntidad)
    rutaAux = rutaAux.replace(':titulo', titulo)
    rutaAux = rutaAux.replace(':accionAlbum', accionAlbum)
    // Guardar info antes de cambiar de componente
    this.guardarInformacionPerfil(this.perfil.estado.codigo as CodigosCatalogosEstadoPerfiles)
    this.router.navigateByUrl(rutaAux, { skipLocationChange: true })
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

  // Actualizar perfil antes de pasar a albunes
  guardarInformacionPerfil(estadoPerfil: CodigosCatalogosEstadoPerfiles) {
    const usuario: UsuarioModel = this.cuentaNegocio.validarUsuarioDelSesionStorage(this.codigoPerfil)
    const { contrasena, direccion, email, nombre, nombreContacto } = this.registroForm.value
    const itemPais = this.confSelector.seleccionado
    const itemLocalidad = this.confBuscador.seleccionado
    const codigoPostal = this.confBuscador.inputPreview.input.auxiliar

    // Asignar data
    this.perfil.nombreContacto = nombreContacto
    this.perfil.nombre = nombre
    this.perfil.direcciones[0] = {
      descripcion: direccion,
      localidad: {
        nombre: (itemLocalidad) ? itemLocalidad.nombre : '',
        codigo: (itemLocalidad) ? itemLocalidad.codigo : '',
        pais: {
          codigo: (itemPais) ? itemPais.codigo : '',
          nombre: (itemPais) ? itemPais.nombre : ''
        },
        codigoPostal: codigoPostal,
      }
    }
    // Se cambia el estado a creado
    this.perfil.estado.codigo = estadoPerfil

    let pos = -1
    usuario.perfiles.forEach((perfil, i) => {
      if (perfil.tipoPerfil.codigo === this.perfil.tipoPerfil.codigo) {
        pos = i
      }
    })

    if (pos >= 0) {
      usuario.perfiles[pos] = this.perfil
    } else {
      usuario.perfiles.push(this.perfil)
    }

    // Actualizar email y contrasena
    usuario.email = email
    usuario.contrasena = contrasena
    this.cuentaNegocio.guardarUsuarioEnSessionStorage(usuario)
  }

  // Validar campo
  validarCampoEnInput(data: any, tipo: number) {
    if (data.texto && data.id && data.texto.length >= 3) {
      // this.validadoresEjecutados = true
      if (tipo === 0) {
        this.perfilNegocio.validarNombreDeContactoUnico(data.texto).subscribe(estado => {
          this.validadoresEjecutados = true
        }, error => {
          this.validadoresEjecutados = false
          this.inputsForm.forEach(item => {
            if (item.id === data.id) {
              item.errorPersonalizado = 'Nombre de contacto no disponible'
            }
          })
        })
      }

      if (tipo === 1) {
        this.cuentaNegocio.validarEmailUnico(data.texto).subscribe(estado => {
          this.validadoresEjecutados = true
        }, error => {
          this.validadoresEjecutados = false
          this.inputsForm.forEach(item => {
            if (item.id === data.id) {
              item.errorPersonalizado = 'Email ya registrado'
            }
          })
        })
      }
    }
  }

  // submit para el registro
  submitRegistro() {
    if (!this.validadoresEjecutados) {
      console.log('entre3')
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
      console.log('entre2')
      let error = true
      this.botonSubmit.enProgreso = true

      if (this.registroForm.valid) {
        if (this.confSelector.seleccionado && this.confSelector.seleccionado.codigo.length > 0) {
          if (this.confBuscador.seleccionado && this.confBuscador.seleccionado.codigo.length > 0) {
            this.guardarInformacionPerfil(CodigosCatalogosEstadoPerfiles.PERFIL_ACTIVO)
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

  // Submit formulario
  submitFormPerfil() {
    console.log('submit')
    switch (this.accionEntidad) {
      case AccionEntidad.REGISTRO:
        console.log('entre')
        this.submitRegistro()
        break
      case AccionEntidad.CREAR:
        break
      case AccionEntidad.ACTUALIZAR:
        break
      default:
        break
    }
  }

  // Hibernar perfil
  hibernarPerfil() {
    this.toast.cambiarStatusToast('Espere por favor ...', true, true, false)
    // Hibernar Perfil peticion
  }

  // Eliminar perfil
  eliminarPerfil() {
    this.toast.cambiarStatusToast('Espere por favor ...', true, true, false)
  }
}