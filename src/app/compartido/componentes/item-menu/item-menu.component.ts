import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core'
import { ItemMenuCompartido } from '../../diseno/modelos/item-menu.interface'
import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service'
import { EventoTapPersonalizado } from 'src/app/nucleo/servicios/generales/detector-gestos.service'
import { LineaDeTexto } from '../../diseno/modelos/linea-de-texto.interface'
import { EstiloDelTextoServicio } from 'src/app/nucleo/servicios/diseno/estilo-del-texto.service'
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio'
import { async } from 'rxjs/internal/scheduler/async'
import { ColorFondoItemMenu } from '../../diseno/enums/color-fondo-item-menu.enum'
import { EspesorLineaItem } from '../../diseno/enums/espesor-linea-item.enum'


@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit, AfterViewInit {
  texto3: Promise<string>;
  texto2: Promise<string>;
  texto1: Promise<string>;

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
    private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) {

  }

  ngOnInit(): void {
    this.obtenerTraducciones()
    this.estiloTexto1();
  }

  estiloTexto1() {
    switch (this.configuracionItem.colorFondo) {
      case ColorFondoItemMenu.PREDETERMINADO:
        return this.estiloTexto.obtenerEstilosTexto({
          color: this.estiloTexto.colorDelTexto.TEXTOAMARILLOBASE,
          estiloTexto: this.estiloTexto.estilosDelTexto.BOLDCONSOMBRA,
          enMayusculas: true,
          tamanoConInterlineado: this.estiloTexto.tamanoDeTextoConInterlineado.L5_IGUAL
        })
      case ColorFondoItemMenu.PERFILCREADO:
        return this.estiloTexto.obtenerEstilosTexto({
          color: this.estiloTexto.colorDelTexto.TEXTOROJOBASE,
          estiloTexto: this.estiloTexto.estilosDelTexto.BOLDCONSOMBRA,
          enMayusculas: true,
          tamanoConInterlineado: this.estiloTexto.tamanoDeTextoConInterlineado.L5_IGUAL
        })
      case ColorFondoItemMenu.PERFILHIBERNADO:
        return this.estiloTexto.obtenerEstilosTexto({
          color: this.estiloTexto.colorDelTexto.AZUL_HIBERNATE,
          estiloTexto: this.estiloTexto.estilosDelTexto.BOLDCONSOMBRA,
          enMayusculas: true,
          tamanoConInterlineado: this.estiloTexto.tamanoDeTextoConInterlineado.L5_IGUAL
        })
      case ColorFondoItemMenu.TRANSPARENTE:
        return this.estiloTexto.obtenerEstilosTexto({
          color: this.estiloTexto.colorDelTexto.TEXTOAMARILLOBASE,
          estiloTexto: this.estiloTexto.estilosDelTexto.BOLDCONSOMBRA,
          enMayusculas: true,
          tamanoConInterlineado: this.estiloTexto.tamanoDeTextoConInterlineado.L5_IGUAL
        })
    }
  }


  obtenerTraducciones() {
    if (this.configuracionItem.texto1) {
      this.texto1 = this.internacionalizacionNegocio.obtenerTextoLlave(this.configuracionItem.texto1);
    }
    if (this.configuracionItem.texto2) {
      this.texto2 = this.internacionalizacionNegocio.obtenerTextoLlave(this.configuracionItem.texto2);
    }
    if (this.configuracionItem.texto3) {
      this.texto3 = this.internacionalizacionNegocio.obtenerTextoLlave(this.configuracionItem.texto3);
    }
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
    clases['gazeAnuncios'] = (this.configuracionItem.tipoMenu === TipoMenu.ANUNCIOS)
    clases['paddig-button-linea1'] = EspesorLineaItem.ESPESOR041 == this.configuracionItem.linea.configuracion.espesor
    clases['paddig-button-linea2'] = EspesorLineaItem.ESPESOR071 == this.configuracionItem.linea.configuracion.espesor
    clases['paddig-button-linea3'] = EspesorLineaItem.ESPESOR089 == this.configuracionItem.linea.configuracion.espesor
    return clases
  }

  // Obtener clases caja item
  obtenerClasesItemCaja() {
    return {
      'caja': true,
      // 'cajaNormal': (this.configuracionItem.tipoMenu !== TipoMenu.ANUNCIOS) ? false : true,
      // 'cajaGaze': (this.configuracionItem.tipoMenu === TipoMenu.ANUNCIOS) ? this.configuracionItem.gazeAnuncios : false
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

  obtenerSeparacionItemInstrucciones() {
    const clases = {}
    clases["instruccion-separacion-min"] = (this.configuracionItem.texto1) ? true : false
    clases["instruccion-separacion-media"] = (this.configuracionItem.texto1) ? false : true
    return clases
  }

}


export enum TipoMenu {
  CREATE_PROFILE_INFO, // Registrar perfiles
  GESTION_PROFILE, // Gestionar perfiles
  ACCION, // Menu principal
  INSTRUCCIONES,
  SUBMENU, // PARA EL SUBMENU DE LOS TRES PUNTOS
  ANUNCIOS, // Para el item menu de gaze anouncement
}
