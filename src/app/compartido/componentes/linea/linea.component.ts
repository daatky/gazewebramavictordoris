import { LineaCompartida } from "../../diseno/modelos/linea.interface";
import { Component, OnInit, Input } from "@angular/core";
import { AnchoLineaItem } from "../../diseno/enums/ancho-linea-item.enum";
import { EspesorLineaItem } from "../../diseno/enums/espesor-linea-item.enum";
import { ColorFondoLinea } from "../../diseno/enums/color-fondo-linea.enum";

@Component({
  selector: "app-linea",
  templateUrl: "./linea.component.html",
  styleUrls: ["./linea.component.scss"],
})
export class LineaComponent implements OnInit {
  @Input()
  configuracionLinea: LineaCompartida;

  constructor() {}

  ngOnInit(): void {
    if (!this.configuracionLinea) {
      this.inicializarConfiguracionPorDefecto();
      console.log(
        "Error, no has enviado configuracion para la linea. Aplicada configuracion por defecto",
      );
    }
  }

  // En caso de que la linea no reciba configuracion alguna, se inicializa por defecto
  inicializarConfiguracionPorDefecto() {
    this.configuracionLinea = {
      ancho: AnchoLineaItem.ANCHO6386,
      espesor: EspesorLineaItem.ESPESOR071,
      colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
      forzarAlFinal: true,
    };
  }

  static configurarLineaContacto() {
    return {
      ancho: AnchoLineaItem.ANCHO6386,
      espesor: EspesorLineaItem.ESPESOR041,
      colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
      forzarAlFinal: true,
    };
  }

  // Devuelve las clases de la linea segun la configuracion
  obtenerClasesLinea() {
    const clases = {};
    clases[this.configuracionLinea.ancho.toString()] = true;
    clases[this.configuracionLinea.espesor.toString()] = true;
    clases[this.configuracionLinea.colorFondo.toString()] = true;
    clases["forzarAlFinal"] = (this.configuracionLinea.forzarAlFinal)
      ? this.configuracionLinea.forzarAlFinal
      : false;
    clases["cajaGaze"] = (this.configuracionLinea.cajaGaze)
      ? this.configuracionLinea.cajaGaze
      : false;
    return clases;
  }
}
