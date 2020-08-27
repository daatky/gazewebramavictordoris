import { AlbumModel } from './../../dominio/modelo/album.model';
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum';
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
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core'
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
import { AccionesAppBar } from './../../compartido/diseno/enums/acciones-appbar.enum'
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

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, AfterViewInit {
  @ViewChild('appbar', { static: false }) appbar: AppbarComponent
  @ViewChild('portadaGaze', { static: false }) portada: PortadaGazeComponent
  @ViewChild('albumPerfil', { static: false }) albumPerfil: ItemCirculoComponent
  @ViewChild('albumGeneral', { static: false }) albumGeneral: ItemRectanguloComponent
  @ViewChild('selectorPaises', { static: false }) selectorPaises: SelectorComponent
  @ViewChild('buscadorLocalidades', { static: false }) buscadorLocalidades: BuscadorModalComponent

  // Parametros url
  public codigoPerfil: string // Codigo del perfil activo

  // Parametros internos
  public confAppBar: ConfiguracionAppbarCompartida // Configuracion del appbar
  public confItemCir: ItemCircularCompartido // Configuracion item del circulo
  public confItemRec: ItemRectangularCompartido // Configuracion item del rectangulo
  public confSelector: ConfiguracionSelector // Configuracion del selector
  public confBuscador: ConfiguracionBuscadorModal // Configuracion buscador localidades
  public registroForm:FormGroup // Formulario de registro
  public inputsForm: Array<InputCompartido> // Configuracion de los inputs
  public botonSubmit: BotonCompartido // Configuracion del boton compartido

  // Parametros
  public tipoPerfil: CatalogoTipoPerfilModel // Perfil activo
  public usuario: UsuarioModel // Usuario activo
  public posPerfil: number // Posicion del perfil en la lista
  public perfil: PerfilModel // Model del perfil

  constructor(
    private formBuilder: FormBuilder,
    private variablesGlobales: VariablesGlobales,
    public estiloDelTextoServicio: EstiloDelTextoServicio,
    private ubicacionNegocio: UbicacionNegocio,
    private rutaActual: ActivatedRoute,
    private router: Router,
    private perfilNegocio: PerfilNegocio,
    private cuentaNegocio: CuentaNegocio,
  ) {
    
  }

  ngOnInit(): void {
    this.variablesGlobales.mostrarMundo = false
    this.inputsForm = []
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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.configurarPortada()

      // Suscribirse a eventos de click en el appbar
      this.appbar.evento.subscribe((accion: AccionesAppBar) => {
        if (accion === AccionesAppBar.IR_A_PAGINA_O_ESTADO_ANTERIOR) {
          this.router.navigateByUrl(RutasLocales.MENU_PERFILES)
          return
        }
      })

      // Suscribirse a eventos de click en el selector de pais
      this.selectorPaises.evento.subscribe((info:InfoAccionSelector) => {
        if (info.accion === AccionesSelector.ABRIR_SELECTOR) {
          this.abrirSelectorPaises()
          return
        }
        if (info.accion === AccionesSelector.SELECCIONAR_ITEM) {
          this.buscadorLocalidades.pais = info.informacion
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
          console.log(info.informacion)
          this.buscarLocalidades(info.informacion.pais, info.informacion.query)
          return
        }
      })
    })
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
    this.tipoPerfil = this.perfilNegocio.obtenerPerfilSegunCodigo(this.codigoPerfil)
    // Obtener el usuario
    this.usuario = this.cuentaNegocio.validarUsuario(this.codigoPerfil)
    // Obtener el perfil

    console.log(this.usuario)
    // Validar si perfil a llenar existe
    this.usuario.perfiles.forEach(item => {
      if (item.tipoPerfil.codigo === this.codigoPerfil) {
        this.perfil = item
      }
    })
    // Si perfil no existe, se crea el perfil
    if (!this.perfil) {
      this.perfil = {
        _id: '',
        nombre: '',
        nombreContacto: '',
        direcciones: [],
        telefonos: [],
        tipoPerfil: this.tipoPerfil,
        estado: {
          codigo: CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR
        },
        albums: []
      }
      // Se inserta en el usuario
      this.usuario.perfiles.push(this.perfil)
    }
    console.log(this.usuario)
  }

  // Inicializar controles para el formulario
  inicializarControles() {
    this.registroForm = this.formBuilder.group({
      nombreContacto: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9 ]+$'),
          Validators.minLength(5)
        ]
      ],
      nombre: [
        '',
        [
          Validators.pattern('^[A-Za-z ]+$'),
          Validators.minLength(3)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[A-Za-z0-9]{8,12}$')
        ]
      ],
      direccion: [
        '',
        [
          Validators.pattern('^[A-Za-z0-9 ]+$')
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
      }
    }
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
        tipo: 'password',
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
  configurarBoton() {
    this.botonSubmit = {
      text: 'Submit'.toUpperCase(),
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      colorTexto: ColorTextoBoton.AMARRILLO,
      tipoBoton: TipoBoton.TEXTO,
      enProgreso: false,
      ejecutar: () => {
        console.log('click on submit')
      }
    }
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
    this.confItemCir = {
      id: '',
      idInterno: '',
      usoDelItem: UsoItemCircular.CIRPERFIL,
      esVisitante: false,
      urlMedia: '',
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
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
    this.confItemRec = {
      id: '',
      idInterno: '',
      usoDelItem: UsoItemRectangular.RECPERFIL,
      esVisitante: false,
      urlMedia: '',
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
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
      }
    }
  }

  // Configurar selectores
  configurarSelectorPais() {
    this.confSelector = {
      tituloSelector: 'Choose the country',
      mostrarModal: false,
      inputPreview: {
        mostrar: true,
        input: {
          valor: '',
          placeholder: 'Country:',
        }
      },
      seleccionado: {
        codigo: '',
        nombre: ''
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
    this.confBuscador = {
      seleccionado: null,
      inputPreview: {
        mostrar: true,
        input: {
          placeholder: 'Post Code:',
          valor: ''
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

  // Evento de click en appbar segun tipo de accion
  // Eventos de click en items
  eventoEnItem(data: InfoAccionCirRec) {
    if (data.accion === AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_PERFIL) {
      const userName = this.registroForm.value.nombre && this.registroForm.value.nombre.length > 0 ? this.registroForm.value.nombre : 'Lorem ipsum dolor'
      const accionAlbum = AccionAlbum.CREAR
      
      let ruta = RutasLocales.ALBUM_PERFIL.toString()
      ruta = ruta.replace(':codigoPerfil', this.codigoPerfil)
      ruta = ruta.replace(':nombreUsuario', userName)
      ruta = ruta.replace(':accionAlbum', accionAlbum)
      this.router.navigateByUrl(ruta)


      // Validar si album existe en el perfil
      let album: AlbumModel = this.obtenerValidarAlbumSegunTipo(CodigosCatalogoTipoAlbum.PERFIL)
      // Si el album no existe, se crea
      
      return
    }

    if (data.accion === AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_GENERAL) {
      const userName = this.registroForm.value.nombre && this.registroForm.value.nombre.length > 0 ? this.registroForm.value.nombre : 'Lorem ipsum dolor'
      const accionAlbum = AccionAlbum.CREAR
      
      let ruta = RutasLocales.ALBUM_GENERAL.toString()
      ruta = ruta.replace(':codigoPerfil', this.codigoPerfil)
      ruta = ruta.replace(':nombreUsuario', userName)
      ruta = ruta.replace(':accionAlbum', accionAlbum)
      this.router.navigateByUrl(ruta)
      return
    }
  }

  // Valida si el album existe en el perfilactivo
  obtenerValidarAlbumSegunTipo(tipo: CodigosCatalogoTipoAlbum) {
    let album: AlbumModel
    // Validar si existe
    this.perfil.albums.forEach(item => {
      if (item.tipo.codigo === CodigosCatalogoTipoAlbum.PERFIL) {
        album = album
      }
    })
    return album
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