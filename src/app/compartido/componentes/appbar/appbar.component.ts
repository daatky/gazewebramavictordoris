import { LineaCompartida } from './../../diseno/modelos/linea.interface'
import { BotonCompartido } from './../../diseno/modelos/boton.interface'
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio'
import { EstiloDelTextoServicio } from './../../../nucleo/servicios/diseno/estilo-del-texto.service'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ConfiguracionAppbarCompartida } from '../../diseno/modelos/appbar.interface'
import { TamanoColorDeFondoAppBar } from '../../diseno/enums/tamano-color-fondo-appbar.enum'
import { LineaDeTexto } from '../../diseno/modelos/linea-de-texto.interface'
import { UsoAppBar } from '../../diseno/enums/uso-appbar.enum'
import { TranslateService } from '@ngx-translate/core'
import { ColorTextoBoton, TipoBoton } from '../button/button.component'
import { TamanoDeTextoConInterlineado } from '../../diseno/enums/tamano-letra-con-interlineado.enum'
import { AnchoLineaItem } from '../../diseno/enums/ancho-linea-item.enum'
import { ColorFondoLinea } from '../../diseno/enums/color-fondo-linea.enum'
import { EspesorLineaItem } from '../../diseno/enums/espesor-linea-item.enum'
import { Location } from '@angular/common'
import { Router } from '@angular/router'
import { RutasLocales } from 'src/app/rutas-locales.enum'

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  @Input() configuracion: ConfiguracionAppbarCompartida

  public usoAppBar = UsoAppBar
  public textoNombrePerfil: string
  public textoTituloPrincipal: string
  public textoSubtitulo: string
  public textoSubtituloDemo: string
  public textoSubtituloNormal: string
  public textoBack: string
  public textoHome: string

  public confBoton: BotonCompartido
  public confLinea: LineaCompartida

  constructor(
    private servicioIdiomas: InternacionalizacionNegocio,
    public estiloDelTextoServicio: EstiloDelTextoServicio,
    private _location: Location,
    private router: Router,
  ) {
    this.textoNombrePerfil = ''
    this.textoTituloPrincipal = ''
    this.textoSubtitulo = ''
    this.textoSubtituloDemo = ''
    this.textoBack = ''
    this.textoHome = ''
  }

  ngOnInit(): void {
    if (this.configuracion) {
      this.inicializarTextos()
      if (this.configuracion.usoAppBar === UsoAppBar.USO_DEMO_APPBAR) {
        this.configurarBotonPrincipal()
      }
      this.configurarLinea()
    }
  }

  // Inicializar textos
  async inicializarTextos() {
    if (this.configuracion.demoAppbar) {
      const conf = this.configuracion.demoAppbar
      this.textoNombrePerfil = await this.servicioIdiomas.obtenerTextoLlave(conf.nombrePerfil.llaveTexto ? conf.nombrePerfil.llaveTexto : 'undefined')
      this.textoSubtitulo = await this.servicioIdiomas.obtenerTextoLlave(conf.subtitulo?.llaveTexto ? conf.subtitulo.llaveTexto : 'undefined')
    }

    if (this.configuracion.searchBarAppBar) {
      const conf = this.configuracion.searchBarAppBar
      this.textoNombrePerfil = await this.servicioIdiomas.obtenerTextoLlave(conf.nombrePerfil.llaveTexto ? conf.nombrePerfil.llaveTexto : 'undefined')
      this.textoSubtitulo = await this.servicioIdiomas.obtenerTextoLlave(conf.subtitulo.llaveTexto ? conf.subtitulo.llaveTexto : 'undefined')
      this.textoHome = await this.servicioIdiomas.obtenerTextoLlave('HOME')
      this.textoBack = await this.servicioIdiomas.obtenerTextoLlave('BACK')
    }

    if (this.configuracion.gazeAppBar) {
      const conf = this.configuracion.gazeAppBar
      this.textoSubtitulo = await this.servicioIdiomas.obtenerTextoLlave(conf.subtituloNormal?.llaveTexto ? conf.subtituloNormal.llaveTexto : 'undefined')
      this.textoSubtituloDemo = await this.servicioIdiomas.obtenerTextoLlave(conf.subtituloDemo?.llaveTexto ? conf.subtituloDemo.llaveTexto : 'undefined')
      this.textoTituloPrincipal = await this.servicioIdiomas.obtenerTextoLlave(conf.tituloPrincipal.llaveTexto ? conf.tituloPrincipal.llaveTexto : 'undefined')
    }
  }

  // Configurar boton principal
  async configurarBotonPrincipal() {
    if (this.configuracion.demoAppbar.boton) {
      //Se puede recibir un boton custom desde fuera
    } else {
      this.confBoton = {
        text: await this.servicioIdiomas.obtenerTextoLlave("suscribirse"),
        tipoBoton: TipoBoton.TEXTO,
        tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
        colorTexto: ColorTextoBoton.AMARRILLO,
        enProgreso: false,
        ejecutar: () => {
          this.router.navigateByUrl(RutasLocales.MENU_PERFILES)
        }
      }
    }
    //this.confBoton.text = await this.servicioIdiomas.obtenerTextoLlave(this.configuracion.demoAppbar.boton.llaveTexto ? this.configuracion.demoAppbar.boton.llaveTexto : 'undefined')
  }

  // Configurar linea verde
  configurarLinea() {
    this.confLinea = {
      ancho: AnchoLineaItem.ANCHO100,
      colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
      espesor: EspesorLineaItem.ESPESOR071,
      forzarAlFinal: false
    }
  }

  // Devuelve las clases que definen los estilos del appbar
  obtenerClasesAppBar() {
    const clases = {}
    clases['appbar'] = true
    clases[this.configuracion.usoAppBar.toString()] = true
    return clases
  }

  // Devuelve las clases para el color de fondo
  obtenerClasesCapaColorFondo(configuracion: any) {
    const clases = {}
    clases['colorFondo'] = true
    clases[configuracion.toString()] = true
    return clases
  }

  // Eventos de click
  clickBotonAtras() {
    if (this.configuracion.accionAtras) {
      this.configuracion.accionAtras();
    } else {
      this._location.back();
    }
  }
  clickBotonXRoja() {
    
  }
  clickBotonPrincipal() {
    
  }
}
