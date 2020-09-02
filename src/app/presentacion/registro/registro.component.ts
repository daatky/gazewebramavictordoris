import { DialogoInlineComponent } from './../../compartido/componentes/dialogo-inline/dialogo-inline.component';
import { ConfiguracionDialogoInline } from './../../compartido/diseno/modelos/dialogo-inline.interface';
import { DialogoCompartido } from 'src/app/compartido/diseno/modelos/dialogo.interface';
import { TranslateService } from '@ngx-translate/core'
import { ConfiguracionToast } from './../../compartido/diseno/modelos/toast.interface'
import { MediaModel } from './../../dominio/modelo/media.model'
import { CodigosCatalogoEntidad } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum'
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
import { BuscadorModalComponent } from '../../compartido/componentes/buscador-modal/buscador-modal.component';
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
import { EstiloInput } from 'src/app/compartido/diseno/enums/estilo-input.enum'
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
import { AccionAlbum } from '../album-perfil/album-perfil.component'
import { TipoDialogo } from 'src/app/compartido/diseno/enums/tipo-dialogo.enum';
import { LocationStrategy } from '@angular/common';

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

  // CodigosTipoPerfil
  public codigosCatalogoTipoPerfil = CodigosCatalogoTipoPerfil
  
  // Parametros url
  public codigoPerfil: string // Codigo del perfil activo

  // Parametros internos
  public confAppBar: ConfiguracionAppbarCompartida // Configuracion del appbar
  public confItemCir: ItemCircularCompartido // Configuracion item del circulo
  public confItemRec: ItemRectangularCompartido // Configuracion item del rectangulo
  public confSelector: ConfiguracionSelector // Configuracion del selector
  public confBuscador: ConfiguracionBuscadorModal // Configuracion buscador localidades
  public confToast: ConfiguracionToast  // Configuracion del toast
  public confBotonPago: BotonCompartido // Boton de pago
  public idDialogo: string // id del dialogo de pago
  public confDialogo: ConfiguracionDialogoInline // Dialogo compartido
  public noCrearMasPerfiles: boolean // False aparece boton no, true aparece boton payment
  public registroForm:FormGroup // Formulario de registro
  public inputsForm: Array<InputCompartido> // Configuracion de los inputs
  public botonSubmit: BotonCompartido // Configuracion del boton compartido
  public tipoPerfil: CatalogoTipoPerfilModel // Perfil activo
  public usuario: UsuarioModel // Usuario activo
  public posPerfil: number // Posicion del perfil en la lista
  public perfil: PerfilModel // Model del perfil
  public perfilCreado: boolean // Indica que el perfil ha sido creado y se debe mostrar la info de pago

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private variablesGlobales: VariablesGlobales,
    public estiloDelTextoServicio: EstiloDelTextoServicio,
    private ubicacionNegocio: UbicacionNegocio,
    private rutaActual: ActivatedRoute,
    private router: Router,
    private perfilNegocio: PerfilNegocio,
    private cuentaNegocio: CuentaNegocio,
  ) {
    this.perfilCreado = false
    this.noCrearMasPerfiles = false
    this.inputsForm = []
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

    // En caso la pagina sea recargada, se actualiza la informacion ingresada
    window.onbeforeunload = () => this.guardarInformacionPerfil(CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.configurarPortada()

      // Definir pais en buscador, en caso de existir
      if (this.perfil.direcciones.length > 0) {
        this.buscadorLocalidades.pais = {
          codigo: this.perfil.direcciones[0].localidad.pais.codigo,
          nombre: this.perfil.direcciones[0].localidad.pais.nombre
        }
      }

      // Suscribirse a eventos de click en el selector de pais
      this.selectorPaises.evento.subscribe((info:InfoAccionSelector) => {
        if (info.accion === AccionesSelector.ABRIR_SELECTOR) {
          this.abrirSelectorPaises()
          return
        }
        if (info.accion === AccionesSelector.SELECCIONAR_ITEM) {
          this.buscadorLocalidades.pais = info.informacion
          this.confBuscador.seleccionado.codigo = ''
          this.confBuscador.seleccionado.nombre = ''
          this.confBuscador.inputPreview.input.valor = ''
          return
        }
      })

      // Suscribirse a eventos de click en el buscador de localidades
      this.buscadorLocalidades.evento.subscribe((info:InfoAccionBuscadorLocalidades) => {
        if (info.accion === AccionesBuscadorModal.ABRIR_BUSCADOR) {
          this.abrirBuscadorLocalidades()
          return
        }
        if (info.accion === AccionesBuscadorModal.REALIZAR_BUSQUEDA) {
          this.buscarLocalidades(info.informacion.pais, info.informacion.query)
          return
        }
      })
    })
  }

  ngOnDestroy() { }

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
    this.dialogoInline.configuracion = this.confDialogo
  }

  // Escucha para el boton de back del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    this.validarEstadoPerfilParaDestruir()
  }

  // Validar estado del perfil para destruir
  validarEstadoPerfilParaDestruir() {
    if (this.perfil.estado.codigo === CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR) {
      this.cuentaNegocio.eliminarPerfilDelUsuario(this.codigoPerfil)
    }
  }

  // Obtiene los parametros recibidos en la url
  obtenerParametrosUrl() {
    if (this.rutaActual.snapshot.params.codigoPerfil) {
      this.codigoPerfil = this.rutaActual.snapshot.params.codigoPerfil
    }
  }

  // Define el tipo de perfil activo
  obtenerTipoPerfil() {
    const tipoPerfiles = this.perfilNegocio.obtenerCatalogoTipoPerfilLocal()
    tipoPerfiles.forEach(perfil => {
      if (perfil.codigo === this.codigoPerfil) {
        this.tipoPerfil = perfil
      }
    })
  }

  // Validar si existe el usuario en el storage
  inicializarDataUsuario() {
    // Obtener el tipo de perfil
    this.tipoPerfil = this.perfilNegocio.obtenerTipoPerfilSegunCodigo(this.codigoPerfil)
    // Obtener el perfil
    this.perfil = this.perfilNegocio.validarPerfilModel(this.codigoPerfil)
  }

  // Inicializar controles para el formulario
  inicializarControles() {

    // Definir email y contrasena
    const usuario: UsuarioModel = this.cuentaNegocio.obtenerUsuarioDelLocalStorage()
    // Defininr descripcion de la direccion
    let direccion = ''
    if (this.perfil.direcciones.length > 0) {
      direccion = this.perfil.direcciones[0].descripcion
    }

    this.registroForm = this.formBuilder.group({
      nombreContacto: [
        this.perfil.nombreContacto,
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9 ]+$'),
          Validators.minLength(5)
        ]
      ],
      nombre: [
        this.perfil.nombre,
        [
          Validators.pattern('^[A-Za-z ]+$'),
          Validators.minLength(3)
        ]
      ],
      email: [
        usuario.email,
        [
          Validators.required,
          Validators.email
        ]
      ],
      contrasena: [
        usuario.contrasena,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[A-Za-z0-9@]{8,12}$')
        ]
      ],
      direccion: [
        direccion,
        [
          Validators.pattern('^[A-Za-z0-9-, ]+$')
        ]
      ]
    });
  }

  // Configurar AppBar
  configurarAppBar() {
    this.confAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: false,
        },
        mostrarTextoBack: true,
        mostrarTextoHome: false,
        subtitulo: {
          mostrar: true,
          llaveTexto: this.obtenerLlaveSegunPerfil() // Obtener nombre de perfil del local storage
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100, 
      },
      accionAtras: () => {
        this.accionAtrasAppbar()
      }
    }
  }

  // Accion atras appbar
  accionAtrasAppbar() {
    // Validar estado del perfil
    this.validarEstadoPerfilParaDestruir()
    this.router.navigateByUrl(RutasLocales.MENU_PERFILES)
  }

  // Configurar inputs
  configurarInputs() {
    // InputComponent
    this.inputsForm.push({
        tipo: 'text',
        error: false,
        estilo: {
          estiloError:EstiloErrorInput.ROJO,
          estiloInput:EstiloInput.REGISTRO
        },
        placeholder: 'Contact Name',
        data: this.registroForm.controls.nombreContacto
    })
    this.inputsForm.push({
        tipo: 'text',
        error: false,
        estilo: {
          estiloError:EstiloErrorInput.ROJO,
          estiloInput:EstiloInput.REGISTRO
        },
        placeholder: 'Name:',
        data: this.registroForm.controls.nombre
    })
    this.inputsForm.push({
        tipo: 'email',
        error: false,
        estilo: {
          estiloError:EstiloErrorInput.ROJO,
          estiloInput:EstiloInput.REGISTRO
        },
        placeholder: 'E-mail:',
        data: this.registroForm.controls.email
    })
    this.inputsForm.push({
        tipo: 'password',
        error: false,
        estilo: {
          estiloError:EstiloErrorInput.ROJO,
          estiloInput:EstiloInput.REGISTRO
        },
        placeholder: 'Password:',
        data: this.registroForm.controls.contrasena
    })
    this.inputsForm.push({
        tipo: 'text',
        error: false,
        estilo: {
          estiloError:EstiloErrorInput.ROJO,
          estiloInput:EstiloInput.REGISTRO
        },
        placeholder: 'Address:',
        data: this.registroForm.controls.direccion
    })
  }

  // Configurar boton
  async configurarBoton() {
    this.botonSubmit = {
      text: '',
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
  configurarAlbumPerfil() {
    let portadaPerfil: AlbumModel
    this.perfil.albums.forEach(item => {
      if (item.tipo.codigo === CodigosCatalogoTipoAlbum.PERFIL) {
        portadaPerfil = item
      }
    })

    // Definir data segun portada?
    let urlMedia = ''
    let mostrarBoton = true
    let mostrarLoader = false
    if (portadaPerfil && portadaPerfil.portada && portadaPerfil.portada.principal) {
      urlMedia = portadaPerfil.portada.principal.url
      mostrarBoton = false
      mostrarLoader = true
    }
    
    this.confItemCir = {
      id: '',
      idInterno: '',
      usoDelItem: UsoItemCircular.CIRPERFIL,
      esVisitante: false,
      urlMedia: urlMedia,
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: mostrarBoton,
      mostrarLoader: mostrarLoader,
      textoBoton: 'Upload Photos',
      eventoEnItem: (data: InfoAccionCirRec) => {
        this.eventoEnItem(data)
      },
      capaOpacidad: {
        mostrar: false
      }
    }
  }

  // Configurar album generarl
  configurarAlbumGeneral() {
    let portadaGeneral: AlbumModel
    this.perfil.albums.forEach(item => {
      if (item.tipo.codigo === CodigosCatalogoTipoAlbum.GENERAL) {
        portadaGeneral = item
      }
    })

    // Definir data segun portada?
    let urlMedia = ''
    let mostrarBoton = true
    let mostrarLoader = false
    if (portadaGeneral && portadaGeneral.portada && portadaGeneral.portada.principal) {
      urlMedia = portadaGeneral.portada.principal.url
      mostrarBoton = false
      mostrarLoader = true
    }

    this.confItemRec = {
      id: '',
      idInterno: '',
      usoDelItem: UsoItemRectangular.RECPERFIL,
      esVisitante: false,
      urlMedia: urlMedia,
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: mostrarBoton,
      mostrarLoader: mostrarLoader,
      textoBoton: 'Upload Photos',
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
  }

  // Configurar selectores
  configurarSelectorPais() {
    // Definir direccion
    let codigoPais = ''
    let nombrePais = ''
    if (this.perfil.direcciones.length > 0) {
      codigoPais = this.perfil.direcciones[0].localidad.pais.codigo
      nombrePais = this.perfil.direcciones[0].localidad.pais.nombre
    }

    this.confSelector = {
      tituloSelector: 'Choose the country',
      mostrarModal: false,
      inputPreview: {
        mostrar: true,
        input: {
          valor: nombrePais,
          placeholder: 'Country:',
        }
      },
      seleccionado: {
        codigo: codigoPais,
        nombre: nombrePais
      },
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
    let seleccionado: ItemSelector = {
      codigo: '',
      nombre: '',
      auxiliar: ''
    }
    let nombreLocalidad = ''
    let codigoPostal = ''
    if (this.perfil.direcciones.length > 0) {
      nombreLocalidad = this.perfil.direcciones[0].localidad.nombre
      codigoPostal = this.perfil.direcciones[0].localidad.codigoPostal
      seleccionado.codigo = this.perfil.direcciones[0].localidad.codigo
      seleccionado.nombre = nombreLocalidad
      seleccionado.auxiliar = codigoPostal
    }

    this.confBuscador = {
      seleccionado: seleccionado,
      inputPreview: {
        mostrar: true,
        input: {
          placeholder: 'Post Code:',
          valor: (nombreLocalidad.length > 0 && codigoPostal.length > 0) ? nombreLocalidad + ' (CP: ' + codigoPostal + ')' : '',
          auxiliar: codigoPostal
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
    this.confDialogo = {
      descripcion: '',
      listaBotones: []
    }

    // Texto descripcion
    const descripcion = await this.translateService.get('dialogoCrearPerfil').toPromise()
    this.confDialogo.descripcion = descripcion
    // Perfiles sobrantes y boton no o boton pago
    this.determinarPerfilesSobrantes()
  }

  async determinarPerfilesSobrantes() {
    // Determinar perfiles sobrantes
    if (this.perfil.tipoPerfil.codigo === CodigosCatalogoTipoPerfil.CLASSIC) {
      // Substituto
      this.confDialogo.listaBotones.push({
        text: '',
        tipoBoton: TipoBoton.TEXTO,
        tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
        colorTexto: ColorTextoBoton.AZUL,
        enProgreso: false,
        ejecutar: () => {
          this.reiniciarInformacionParaCambioDePerfil(CodigosCatalogoTipoPerfil.SUBSTITUTE)
          this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", CodigosCatalogoTipoPerfil.SUBSTITUTE))
        },
      })
      // Ludico
      this.confDialogo.listaBotones.push({
        text: '',
        tipoBoton: TipoBoton.TEXTO,
        tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
        colorTexto: ColorTextoBoton.ROJO,
        enProgreso: false,
        ejecutar: () => {
          this.reiniciarInformacionParaCambioDePerfil(CodigosCatalogoTipoPerfil.PLAYFUL)
          this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", CodigosCatalogoTipoPerfil.PLAYFUL))
        },
      })

      const botonPosCero = await this.translateService.get('sustituto').toPromise()
      const botonPosUno = await this.translateService.get('ludico').toPromise()
      this.confDialogo.listaBotones[0].text = botonPosCero
      this.confDialogo.listaBotones[1].text = botonPosUno
      // Determinar boton no o boton payment
      this.determinarBotonNoBotonPaymente(-1)
    }

    if (this.perfil.tipoPerfil.codigo === CodigosCatalogoTipoPerfil.PLAYFUL) {
      // Clasico y substituto
      this.confDialogo.listaBotones.push({
        text: '',
        tipoBoton: TipoBoton.TEXTO,
        tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
        colorTexto: ColorTextoBoton.AZUL,
        enProgreso: false,
        ejecutar: () => {
          this.reiniciarInformacionParaCambioDePerfil(CodigosCatalogoTipoPerfil.CLASSIC)
          this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", CodigosCatalogoTipoPerfil.CLASSIC))
        },
      })
      // Substituto
      this.confDialogo.listaBotones.push({
        text: '',
        tipoBoton: TipoBoton.TEXTO,
        tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
        colorTexto: ColorTextoBoton.ROJO,
        enProgreso: false,
        ejecutar: () => {
          this.reiniciarInformacionParaCambioDePerfil(CodigosCatalogoTipoPerfil.SUBSTITUTE)
          this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", CodigosCatalogoTipoPerfil.SUBSTITUTE))
        },
      })

      const botonPosCero = await this.translateService.get('clasico').toPromise()
      const botonPosUno = await this.translateService.get('sustituto').toPromise()
      this.confDialogo.listaBotones[0].text = botonPosCero
      this.confDialogo.listaBotones[1].text = botonPosUno
      // Determinar boton no o boton payment
      this.determinarBotonNoBotonPaymente(-1)
    }

    if (this.perfil.tipoPerfil.codigo === CodigosCatalogoTipoPerfil.SUBSTITUTE) {
      // Clasico y ludico
      this.confDialogo.listaBotones.push({
        text: '',
        tipoBoton: TipoBoton.TEXTO,
        tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
        colorTexto: ColorTextoBoton.AZUL,
        enProgreso: false,
        ejecutar: () => {
          this.reiniciarInformacionParaCambioDePerfil(CodigosCatalogoTipoPerfil.CLASSIC)
          this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", CodigosCatalogoTipoPerfil.CLASSIC))
        },
      })
      // Ludico
      this.confDialogo.listaBotones.push({
        text: '',
        tipoBoton: TipoBoton.TEXTO,
        tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL,
        colorTexto: ColorTextoBoton.ROJO,
        enProgreso: false,
        ejecutar: () => {
          this.reiniciarInformacionParaCambioDePerfil(CodigosCatalogoTipoPerfil.PLAYFUL)
          this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", CodigosCatalogoTipoPerfil.PLAYFUL))
        },
      })

      const botonPosCero = await this.translateService.get('clasico').toPromise()
      const botonPosUno = await this.translateService.get('ludico').toPromise()
      this.confDialogo.listaBotones[0].text = botonPosCero
      this.confDialogo.listaBotones[1].text = botonPosUno
      // Determinar boton no o boton payment
      this.determinarBotonNoBotonPaymente(-1)
    }
  }

  async determinarBotonNoBotonPaymente(pos: number) {
    const configuracion: BotonCompartido = {
      text: '',
      tipoBoton: TipoBoton.TEXTO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      colorTexto: ColorTextoBoton.AMARRILLO,
      enProgreso: false,
      ejecutar: () => {},
    }
    // Se inserta el boton
    if (pos < 0) {
      this.confDialogo.listaBotones.push(configuracion)
    } else {
      this.confDialogo.listaBotones[pos] = configuracion
    }

    if (!this.noCrearMasPerfiles) {
      // Si es falso, aparece boton no.
      const texto = await this.translateService.get('no').toPromise()
      this.confDialogo.listaBotones[2].text = texto
      this.confDialogo.listaBotones[2].ejecutar = () => {
        this.noCrearMasPerfiles = true
        this.determinarBotonNoBotonPaymente(2)
      }
    } else {
      // Si es verdadero aparece boton payment
      // Si es falso, aparece boton no.
      const texto = await this.translateService.get('pago').toPromise()
      this.confDialogo.listaBotones[2].text = texto
      this.confDialogo.listaBotones[2].ejecutar = () => {
        this.router.navigateByUrl(RutasLocales.METODO_PAGO)
      }
    }
  }

  // 
  irAlPerfil() {
    
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
      }, error => {
        this.selectorPaises.mostrarError('Lo sentimos, ocurrio un error al obtener la informacion')
      })
  }

  // Click en input localidades
  abrirBuscadorLocalidades() {
    if (! this.buscadorLocalidades.pais ) {
      this.buscadorLocalidades.mostrarError( 'Error, debes seleccionar el pais antes de buscar una localidad', true, true)
    }
    this.buscadorLocalidades.configuracion.mostrarModal = true
  }

  // Buscador localidades
  buscarLocalidades(pais:string, query:string) {
    this.buscadorLocalidades.configuracion.resultado.mostrarCargando = true
    this.ubicacionNegocio.obtenerCatalogoLocalidadesPorNombrePorPaisParaSelector(pais, query)
      .subscribe(data => {
        this.buscadorLocalidades.mostrarElegibles( (Array.isArray(data)) ? data : [data] )
        this.buscadorLocalidades.configuracion.resultado.mostrarCargando = false
      }, error => {
        this.buscadorLocalidades.mostrarError('Ocurrio un error al procesar tu solicitud, intenta mas tarde', true)
      })
  }

  // Navegar a ruta de album
  irAlAlbumConParametros(
    tipoAlbum: CodigosCatalogoTipoAlbum,
    ruta: RutasLocales,
    entidad: CodigosCatalogoEntidad,
    codigo: string,
    titulo: string,
    accion: AccionAlbum
  ) {
    // Validar el album
    this.perfilNegocio.validarAlbumSegunTipo(tipoAlbum, this.perfil)
    // Definir parametros de la url
    let rutaAux = ruta.toString()
    rutaAux = rutaAux.replace(':entidad', entidad)
    rutaAux = rutaAux.replace(':codigo', codigo)
    rutaAux = rutaAux.replace(':titulo', titulo)
    rutaAux = rutaAux.replace(':accion', accion)
    // Guardar info antes de cambiar de componente
    this.guardarInformacionPerfil(CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR)
    this.router.navigateByUrl(rutaAux)
  }

  // Eventos de click en items
  eventoEnItem(data: InfoAccionCirRec) {
    if (data.accion === AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_PERFIL) {
      const userName = this.registroForm.value.nombre && this.registroForm.value.nombre.length > 0 ? this.registroForm.value.nombre : 'Lorem ipsum dolor'

      this.irAlAlbumConParametros(
        CodigosCatalogoTipoAlbum.PERFIL,
        RutasLocales.ALBUM_PERFIL,
        CodigosCatalogoEntidad.PERFIL,
        this.codigoPerfil,
        userName,
        AccionAlbum.CREAR
      )
      return
    }

    if (data.accion === AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_GENERAL) {
      const userName = this.registroForm.value.nombre && this.registroForm.value.nombre.length > 0 ? this.registroForm.value.nombre : 'Lorem ipsum dolor'
      this.irAlAlbumConParametros(
        CodigosCatalogoTipoAlbum.GENERAL,
        RutasLocales.ALBUM_GENERAL,
        CodigosCatalogoEntidad.PERFIL,
        this.codigoPerfil,
        userName,
        AccionAlbum.CREAR
      )
      return
    }
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

  // Actualizar perfil antes de pasar a albunes
  guardarInformacionPerfil(estadoPerfil: CodigosCatalogosEstadoPerfiles) {
    const usuario: UsuarioModel = this.cuentaNegocio.validarUsuario(this.codigoPerfil)
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
    this.cuentaNegocio.guardarUsuarioEnLocalStorage(usuario)
  }

  // Submit formulario
  submitFormPerfil() {
    let error = true
    this.botonSubmit.enProgreso = true
    if (this.registroForm.valid) {
      if (this.confSelector.seleccionado && this.confSelector.seleccionado.codigo.length > 0) {
        if (this.confBuscador.seleccionado && this.confBuscador.seleccionado.codigo.length > 0) {
          this.guardarInformacionPerfil(CodigosCatalogosEstadoPerfiles.PERFIL_CREADO)
          this.perfilCreado = true
          this.botonSubmit.enProgreso = false
          error = false
        } 
      }
    }

    if (error) {
      this.botonSubmit.enProgreso = false
      this.confToast.texto = 'Existen campos incompletos'
      this.confToast.cerrarClickOutside = true
      this.confToast.mostrarToast = true
    }
  }
}