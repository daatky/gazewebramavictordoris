import { Component, Input, OnInit } from '@angular/core';
import { UsoItemCircular } from '../../diseno/enums/uso-item-cir-rec.enum';

@Component({
  selector: 'app-item-circular',
  templateUrl: './item-circular.component.html',
  styleUrls: ['./item-circular.component.scss']
})
export class ItemCircularComponent implements OnInit {

  @Input() configuracion: ItemCirularCompartido;

  constructor() { }

  ngOnInit(): void {

  }

  static initFotoContacto(
    id: string,
    urlFoto: string = "",
    cargando: boolean,
    fotoCargo: Function,
    tap: Function = () => { }
  ): ItemCirularCompartido {
    return {
      id: id,
      cargando: cargando,
      tipo: UsoItemCircular.CIRCONTACTO,
      tap: tap,
      fotoCargo: fotoCargo,
      estado: EstadoItemCircular.DEFECTO,
      urlFoto: urlFoto,
      urlFotoDefecto: "https://firebasestorage.googleapis.com/v0/b/darhu-3f87a.appspot.com/o/challenges%2F0k9jCrL0ynizh60fgImG%2F1585350006868.jpg?alt=media&token=088a85fc-ab88-49e7-856c-2e8da74b555a"
    }
  }

  obtenerClasesParaItemCircularFoto() {
    return {
      'capa': true,
      'mostrar': !this.configuracion.cargando,
      'itemCirculo': true, // Clase por defecto            
      'contacto': (this.configuracion.tipo === UsoItemCircular.CIRCONTACTO), // Indica que el item va a ser usado con las dimensiones de la clase contacto      
    }
  }
  obtenerClasesParaItemCircularLoader() {
    return {
      'capa': true,
      'loader': true,
      'mostrar': this.configuracion.cargando,
      'itemCirculo': true, // Clase por defecto            
      'contacto': (this.configuracion.tipo === UsoItemCircular.CIRCONTACTO), // Indica que el item va a ser usado con las dimensiones de la clase contacto      
    }
  }

  tap() {
    if (this.configuracion.tap) {
      this.configuracion.tap();
    }

  }
  dobletap() {
    if (this.configuracion.dobleTap) {
      this.configuracion.dobleTap();
    }
  }

  press() {
    if (this.configuracion.press) {
      this.configuracion.press();
    }
  }

  siImagenEstaCargada(evt: any) {
    this.configuracion.cargando = false
    this.configuracion.fotoCargo()
  }

}

export interface ItemCirularCompartido {
  id: string,
  tipo?: UsoItemCircular,
  estado?: EstadoItemCircular,
  urlFoto?: string,
  urlFotoDefecto?: string,
  tap?: Function,
  dobleTap?: Function,
  press?: Function,
  cargando: boolean,
  fotoCargo: Function
}

export enum EstadoItemCircular {
  DEFECTO,
  SELECCIONADO,
  NUEVO_MENSAJE,
}

