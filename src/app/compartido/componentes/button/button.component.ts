import { Component, Renderer2, ElementRef, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { TamanoDeTextoConInterlineado } from '../../diseno/enums/tamano-letra-con-interlineado.enum';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';

/*
@autor: Victor Jumbo
@Fecha: 28 julio 2020
@Detalle: Componente generico de botones.
@Implementacion: La implemetacion es mediante la importacion del componente en el html

          <app-button [botonCompartido]="botonCompartido"></app-button>

@Param botonCompartido: BotonCompartido, interfaz utilizada para asignar configuracion al boton

Se creo dos metodos estaticos para la creacion de los botones estandar de un dialogo confirmacion
  crearBotonAfirmativo(funcion: Function);
  crearBotonNegativo(funcion: Function);
*/
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() botonCompartido: BotonCompartido
  public tipoBoton = TipoBoton //La referencia esta siendo utilizado para un ngswitch
  texto: Promise<string>;

  constructor
    (
      private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) {

  }

  ngOnInit(): void {

  }

  obtenerTexto() {
    return this.internacionalizacionNegocio.obtenerTextoSincrono(this.botonCompartido.text);
  }


  execute() {
    this.botonCompartido.ejecutar();
  }

  obtenerEstilosBoton() {
    return {
      'buttonBase': true,
      'botonCorto': this.botonCompartido.text.length <= 4,
      'botonLargo': this.botonCompartido.text.length > 4,
      [this.botonCompartido.colorTexto]: true,
      [this.botonCompartido.tamanoTexto]: true
    }
  }

  static crearBotonAfirmativo(funcion: Function): BotonCompartido {
    return {
      colorTexto: ColorTextoBoton.ROJO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      text: "si",
      ejecutar: funcion,
      enProgreso: false,
      tipoBoton: TipoBoton.TEXTO
    }
  }

  static crearBotonNegativo(funcion: Function): BotonCompartido {
    return {
      colorTexto: ColorTextoBoton.AMARRILLO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      text: "no",
      ejecutar: funcion,
      enProgreso: false,
      tipoBoton: TipoBoton.TEXTO
    }
  }
}

export enum ColorTextoBoton {
  AMARRILLO = "txt-amarillo-base",
  VERDE = "txt-verde-base",
  ROJO = "txt-rojo-base",
  CELESTE = "txt-btn-history",
  BLANCO = "txt-btn-blanco",
  AZUL = "txt-azul-base",
}

export enum TipoBoton {
  TEXTO,
  TEXTO_ICON,
  ICON
}
