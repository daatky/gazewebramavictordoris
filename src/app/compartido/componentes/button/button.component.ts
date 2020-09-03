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
  @ViewChild('button', { static: false })
  private buttonElemento: ElementRef
  public tipoBoton = TipoBoton //La referencia esta siendo utilizado para un ngswitch
  public test = TamanoDeTextoConInterlineado
  texto: Promise<string>;

  constructor
    (
      private render: Renderer2,
      private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) {

  }

  ngOnInit(): void {
    if (this.botonCompartido.text) {
      this.texto = this.internacionalizacionNegocio.obtenerTextoLlave(this.botonCompartido.text);
    }
  }

  ngAfterViewInit() {
    if (!this.botonCompartido.enProgreso) {
      this.definirEstilo();
    }

  }


  definirEstilo() {
    if (this.botonCompartido.tipoBoton === TipoBoton.TEXTO) {
      this.render.addClass(this.buttonElemento.nativeElement, "buttonBase")

      this.definirTamanoLetra(this.botonCompartido.tamanoTexto);
      if (this.botonCompartido.text.length <= 4) { //Botones ok yes, no    
        this.render.addClass(this.buttonElemento.nativeElement, "botonCorto")

      } else { //Botones como submit, publish 
        this.render.addClass(this.buttonElemento.nativeElement, "botonLargo")
      }
      this.definirColor(this.botonCompartido.colorTexto);
    }
  }
  definirColor(color: ColorTextoBoton) {
    this.render.addClass(this.buttonElemento.nativeElement, color.toString())
  }

  definirTamanoLetra(tamano: TamanoDeTextoConInterlineado) {
    this.render.addClass(this.buttonElemento.nativeElement, tamano.toString())
  }

  execute() {
    this.botonCompartido.ejecutar();
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
  TEXTO_ICON
}
