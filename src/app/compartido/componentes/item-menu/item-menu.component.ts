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
import { ItemMenuModel, ItemAccion } from 'src/app/dominio/modelo/item-menu.model'
import { timeout, map, debounceTime } from 'rxjs/operators'
import { Observable, fromEvent } from 'rxjs'



@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('itemMenu', { static: false }) itemMenu: ElementRef
  @Input() configuracionItem: ItemMenuCompartido
  public tipoMenu = TipoMenu

  texto3: Promise<string>;
  texto2: Promise<string>;
  texto1: Promise<string>;
  textos: Promise<string>[] = [];

  constructor(
    public estiloTexto: EstiloDelTextoServicio,
    private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) {
  }

  ngOnInit(): void {
    this.obtenerTraducciones()
    this.obtenerTraduccionesListaPalabras()
    this.estiloTexto1();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    })
  }

  tap() {
    try {
      this.configuracionItem.onclick()
    } catch (error) {
      console.error('Evento de click no definido')
    }
  }

  dobletap() {
    try {
      this.configuracionItem.dobleClick() 
    } catch (error) {
      console.error('Evento de doble click no definido')
    }
  }

  press() {
    try {
      this.configuracionItem.clickSostenido()
    } catch (error) {
      console.error('Evento de click sostenido no definido')
    }
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

  obtenerTraduccionesListaPalabras() {
    if (this.configuracionItem.descripcion) {
      this.textos = []
      for (let palabra of this.configuracionItem.descripcion) {
        //this.textos.push(this.internacionalizacionNegocio.obtenerTextoLlave(palabra))
      }
    }

    if (this.configuracionItem.acciones) {
      this.textos = []
      for (let accion of this.configuracionItem.acciones) {
        this.textos.push(this.internacionalizacionNegocio.obtenerTextoLlave(accion.nombre))
      }
    }

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

  obtenerSeparacionItemInstrucciones() {
    const clases = {}
    clases["instruccion-separacion-min"] = (this.configuracionItem.texto1) ? true : false
    clases["instruccion-separacion-media"] = (this.configuracionItem.texto1) ? false : true
    return clases
  }

  clickItemSubMenu(item: ItemAccion) {
    item.accion();
  }

  //temporal, considere la eliminacion en caso de no usuarlo
  estiloTextoMenus(item: ItemAccion) {
    if (item.codigo == "g") {
      return this.estiloTexto.obtenerEstilosTexto({
        color: this.estiloTexto.colorDelTexto.GRIS,
        estiloTexto: this.estiloTexto.estilosDelTexto.BOLD,
        enMayusculas: true,
        tamanoConInterlineado: this.estiloTexto.tamanoDeTextoConInterlineado.L2_I8
      })
    } else {
      return this.estiloTexto.obtenerEstilosTexto({
        color: this.estiloTexto.colorDelTexto.GRIS,
        estiloTexto: this.estiloTexto.estilosDelTexto.BOLD,
        enMayusculas: true,
        tamanoConInterlineado: this.estiloTexto.tamanoDeTextoConInterlineado.L1_I8
      })
    }
  }

}


export enum TipoMenu {
  CREATE_PROFILE_INFO, // Registrar perfiles
  GESTION_PROFILE, // Gestionar perfiles
  ACCION, // Menu principal
  INSTRUCCIONES,
  SUBMENU, // PARA EL SUBMENU DE LOS TRES PUNTOS
  ANUNCIOS, // Para el item menu de gaze anouncement,
  LEGAL
}
