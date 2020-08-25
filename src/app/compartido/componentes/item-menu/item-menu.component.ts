import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core'
import { ItemMenuCompartido } from '../../diseno/modelos/item-menu.interface'
import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service'
import { EventoTapPersonalizado } from 'src/app/nucleo/servicios/generales/detector-gestos.service'
import { LineaDeTexto } from '../../diseno/modelos/linea-de-texto.interface'
import { EstiloDelTextoServicio } from 'src/app/nucleo/servicios/diseno/estilo-del-texto.service'


@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit, AfterViewInit {

  /*
    Especificaiones generales,

    - Se debe configurar el item antes de dibujar, segun el modelo ItemMenuCompartido. (Ejemplo: revisar metodo inicializarConfiguracionPordefecto
    - Cada linea de texto que vaya a ser mostrarda en el item sera dibujada en base al orden en el que fueron enviadas ItemMenuCompartido.lineasTexto
      - Para cada linea del array, debe haber un configuracion segun el modelo LineasTextoItemMenu.
        - Para el Tamano y alto de liena, se debe especificar segun el enum TamanoDeTextoConInterlineado. 
        - En caso de no haber el valor deseado en el enum, agregar la clase a estiloFuente y el valor respectivo en el enum
    - Los eventos,
      - Cuando se produce un evento en el item, se notifica al padre (Se envia el Id del item donde se genero el evento) usando datosItem (click, doble click o long click)
  */

  @Input() configuracionItem: ItemMenuCompartido
  public tipoMenu = TipoMenu

  constructor(
    private gestorEventosTap: EventoTapPersonalizado,
    public estiloTexto: EstiloDelTextoServicio,
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Inicializar eventos de tap y doble tap
      const elemento = document.getElementById("itemMenu" + this.configuracionItem.idInterno) as HTMLElement
      if (elemento) {
        const gestor = this.gestorEventosTap.construirEventosTap(elemento)
        gestor.on('tap', () => {
          console.log('un tap')
          this.configuracionItem.onclick();
        })
        gestor.on('dobletap', () => {
          console.log('dos tap')
          this.configuracionItem.dobleClick();
        })
      }
    })
  }

  // Obtener las clases del item segun su configuracion
  obtenerItemClases() {
    const clases = {}
    clases['itemMenu'] = true
    clases[this.configuracionItem.tamano.toString()] = true
    clases[this.configuracionItem.colorFondo.toString()] = true
    clases['gazeAnuncios'] = (this.configuracionItem.gazeAnuncios) ? this.configuracionItem.gazeAnuncios : false
    return clases
  }

  // Obtener clases caja item
  obtenerClasesItemCaja() {
    return {
      'caja': true,
      'cajaNormal': (this.configuracionItem.gazeAnuncios) ? false : true,
      'cajaGaze': (this.configuracionItem.gazeAnuncios) ? this.configuracionItem.gazeAnuncios : false
    }
  }

  // Obtener clases lineas texto 
  obtenerClasesLineasTexto(linea: LineaDeTexto) {
    const clases = {}
    clases[linea.color.toString()] = true
    clases[linea.estiloTexto.toString()] = true
    clases[linea.tamanoConInterlineado.toString()] = true
    clases['enMayusculas'] = linea.enMayusculas
    return clases
  }

  eventoClickLargo() {
    this.configuracionItem.clickSostenido()
  }

}


export enum TipoMenu {
  CREATE_PROFILE_INFO, //registrar perfiles
  GESTION_PROFILE,
  ACCION, // Menu principal
  INSTRUCCIONES,
  SUBMENU, //PARA EL SUBMENU DE LOS TRES PUNTOS
}
