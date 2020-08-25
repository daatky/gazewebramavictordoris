import { ItemSelector } from './../../diseno/modelos/elegible.interface';
import { InfoAccionSelector } from './../../diseno/modelos/info-accion-selector.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ConfiguracionSelector } from './../../diseno/modelos/selector.interface'
import { EstiloDelTextoServicio } from './../../../nucleo/servicios/diseno/estilo-del-texto.service'
import { AccionesSelector } from './../../diseno/enums/acciones-selector.enum'

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  @Input() configuracion: ConfiguracionSelector
  @Output() evento: EventEmitter<InfoAccionSelector>

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio,
  ) {
    this.evento = new EventEmitter<InfoAccionSelector>()
  }

  ngOnInit() {
  }

  // Abrir selector
  clickInputSelector() {
    this.evento.emit({
      accion: AccionesSelector.ABRIR_SELECTOR
    })
  }

  // Seleccionar el pais
  elegirPais(id:string, nombre:string) {
    this.configuracion.seleccionado = {
      codigo: id,
      nombre: nombre
    }
    this.configuracion.mostrarModal = false
    this.configuracion.inputPreview.input.valor = nombre
    this.evento.emit({
      accion: AccionesSelector.SELECCIONAR_ITEM,
      informacion: this.configuracion.seleccionado
    })
  }

  // Reiniciar selector
  reiniciarSelector() {
    this.configuracion.mostrarModal = false
    this.configuracion.cargando.mostrar = false
    this.configuracion.error.mostrarError = false
    this.configuracion.error.contenido = ''
    this.configuracion.error.tamanoCompleto = false
  }

  // Setear error
  mostrarError(error:string) {
    this.configuracion.elegibles = []
    this.configuracion.error.contenido = error
    this.configuracion.error.mostrarError = true
    this.configuracion.cargando.mostrar = false
  }

  // Evento en modal (Borde negro)
  eventoModal(target:any) {
    target.classList.forEach((clase:any) => {
      if (clase === 'modal') {
        this.reiniciarSelector()
        return
      }
    })
  }

}
