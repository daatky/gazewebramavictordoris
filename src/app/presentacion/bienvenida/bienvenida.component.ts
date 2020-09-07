import { Component, OnInit, ViewChild } from '@angular/core';
import { PortadaGazeComponent } from 'src/app/compartido/componentes/portada-gaze/portada-gaze.component';
import { TamanoPortadaGaze } from 'src/app/compartido/diseno/enums/tamano-portada-gaze.enum';
import { VariablesGlobales } from 'src/app/nucleo/servicios/generales/variables-globales.service';
import { LineaCompartida } from 'src/app/compartido/diseno/modelos/linea.interface';
import { AnchoLineaItem } from 'src/app/compartido/diseno/enums/ancho-linea-item.enum';
import { EspesorLineaItem } from 'src/app/compartido/diseno/enums/espesor-linea-item.enum';
import { ColorFondoLinea } from 'src/app/compartido/diseno/enums/color-fondo-linea.enum';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { Router } from '@angular/router';
import { RutasLocales } from 'src/app/rutas-locales.enum';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {
  @ViewChild('portadaGazeComponent') portadaGazeComponent: PortadaGazeComponent
  configuracionLinea1: LineaCompartida
  configuracionLinea2: LineaCompartida
  botonEnter: BotonCompartido
  /*
   ancho:AnchoLineaItem,
    espesor:EspesorLineaItem,
    colorFondo:ColorFondoLinea,
    forzarAlFinal?:boolean, 
  */
  constructor(
    private globales: VariablesGlobales,
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private router: Router
  ) {
    this.cargarDatos()
  }

  ngOnInit(): void {
  }
  async cargarDatos() {
    this.configuracionLinea1 = { ancho: AnchoLineaItem.ANCHO6382, espesor: EspesorLineaItem.ESPESOR071, colorFondo: ColorFondoLinea.FONDOLINEAVERDE }
    this.configuracionLinea2 = { ancho: AnchoLineaItem.ANCHO6916, espesor: EspesorLineaItem.ESPESOR071, colorFondo: ColorFondoLinea.FONDOLINEAVERDE }
    this.botonEnter = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('ingrese'), tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.navegarMenuPrincipal() }
  }
  navegarMenuPrincipal() {
    this.router.navigateByUrl(RutasLocales.MENU_PRINCIPAL.replace(":codigoPerfil", ""));
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      this.globales.mostrarMundo = true
      this.portadaGazeComponent.reDibujar({ tamano: TamanoPortadaGaze.PORTADACOMPLETA, espacioDerecha: true })
    })
  }
  async cambiarIdioma() {
    this.botonEnter.text = await this.internacionalizacionNegocio.obtenerTextoLlave('ingrese')
  }
}
