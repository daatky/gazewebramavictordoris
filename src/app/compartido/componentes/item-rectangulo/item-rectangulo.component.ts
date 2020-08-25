import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core'

import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service'
import { ItemCircularRectangularMetodosCompartidos } from 'src/app/nucleo/servicios/diseno/item-cir-rec.service'
import { ItemRectangularCompartido } from '../../diseno/modelos/item-cir-rec.interface'
import { InfoAccionCirRec } from '../../diseno/modelos/info-accion-cir-rec.interface'
import { UsoItemRectangular } from '../../diseno/enums/uso-item-cir-rec.enum'
import { AccionesItemCircularRectangular } from '../../diseno/enums/acciones-item-cir-rec.enum'

@Component({
  selector: 'app-item-rectangulo',
  templateUrl: './item-rectangulo.component.html',
  styleUrls: ['./item-rectangulo.component.scss']
})
export class ItemRectanguloComponent implements OnInit, AfterViewInit {

  /* 
    Especificaciones generales,

    - Antes de diubjar el item, se debe configurar segun el uso que se le vaya a dar: enum UsoItemRectangular
    - La configuracion debe ser almacenada en una variable de tipo modelo ItemRectangularCompartido y asignada al paremetro @Input() configuracion
    - Las acciones que se disparan en el item segun el tipo de evento, estan catalogadas por el enum AccionesItemCirRec
  */

  @Input() configuracion: ItemRectangularCompartido // Configuracion del item, para dibujar el item los valores de dataItemCRCompartido deben ser establecidos
  
  public infoAccion: InfoAccionCirRec // Informacion de que accion se va a ejecutar en el padre cuando se dispare un evento
  public itemMetodos: ItemCircularRectangularMetodosCompartidos // Contiene metodos generales para el item
  public bordesEsquinas: Array<number> // El numero de bordes (esquinas)

  constructor(
    private generadorId:GeneradorId
  ) {
    this.itemMetodos = new ItemCircularRectangularMetodosCompartidos()
    this.bordesEsquinas = [0, 1, 2, 3]
  }

  ngOnInit(): void {
    this.configuracion.idInterno = this.generadorId.generarIdConSemilla() // Generar id interno
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Inicializar Eventos Tap y Doble Tap
      const canvas = document.getElementById("itemRectangularCanvas" + this.configuracion.idInterno) as HTMLElement
      const gestor = this.itemMetodos.inicializarEventosDeTapPersonalizados(canvas)
      gestor.on('tap', () => {
        this.eventoClick()
      })
      gestor.on('dobletap', () => {
        this.eventoDobleClick()
      })
    })
  }

  // Se ejecuta cuando se dispara un evento de click en el item
  eventoClick() {
    try {
      // Si el item no tiene eventos
      if (!this.configuracion.activarClick) {
        return
      }

      // Cuando el item se usa en el perfil de otro usuario o mi perfil
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECPERFIL) {
        this.infoAccion = {
          accion: (this.configuracion.esVisitante) ? AccionesItemCircularRectangular.VISITAR_ALBUM_GENERAL : AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_GENERAL
        }
        this.configuracion.eventoEnItem(this.infoAccion)
        return
      }

      // Cuando se usa en el album para mostrar la miniatura
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECALBUMMINI) {
        // Si esta en modo visita
        if (this.configuracion.esVisitante) {
          this.infoAccion = {
            accion: AccionesItemCircularRectangular.CAMBIAR_A_MODO_ALBUM_PREVIEW_VISITA,
            informacion: this.configuracion.id
          }
          // Se cambia el item a modo RECALBUMPREVIEW, mostrar la descripcion, mostrar el icono de expandir
          this.configuracion.usoDelItem = UsoItemRectangular.RECALBUMPREVIEW
          this.configuracion.mostrarIconoExpandirFoto = true
          this.configuracion.eventoEnItem(this.infoAccion)
          return
        }

        // Accion por defecto, elegir archivo para subir - click en input tipo file
        const selector = document.getElementById("itemRectangularInputFile" + this.configuracion.idInterno)
        selector.click()
        return
      }

      // Cuando se usa para mostrar la preview del item en el album
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECALBUMPREVIEW) {
        // Si esta en modo visita
        if (this.configuracion.esVisitante) {
          // Agrandar la foto en pantalla completa
          this.infoAccion = {
            accion: AccionesItemCircularRectangular.EXPANDIR_FOTO_DEL_ITEM,
            informacion: {
              id: this.configuracion.id,
              urlMedia: this.configuracion.urlMedia 
            }
          }
          this.configuracion.eventoEnItem(this.infoAccion)
          return
        }

        // Si la capa imagen seleccionada con borde esta activada
        if (this.configuracion.mostrarCapaImagenSeleccionadaConBorde) {
          this.infoAccion = {
            accion: AccionesItemCircularRectangular.DEJAR_DE_EDITAR_DESCRIPCION,
            informacion: this.configuracion.id
          }
          // Se debe ocultar la capa de imagen seleccionada con borde
          this.configuracion.mostrarCapaImagenSeleccionadaConBorde = false
          this.configuracion.eventoEnItem(this.infoAccion)
          return
        }

        // Accion por defecto
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.EDITAR_DESCRIPCION,
          informacion: this.configuracion.id
        }
        // Se muestra la capa de imagen seleccionada con borde
        this.configuracion.mostrarCapaImagenSeleccionadaConBorde = true
        this.configuracion.eventoEnItem(this.infoAccion)
        return
      }
    } catch(error) {
      console.log(error)
    }
  }

  // Se ejecuta cuando se dispara un evento de doble click en el item
  eventoDobleClick() {
    try {
      // Si el item no tiene eventos
      if (!this.configuracion.activarDobleClick) {
        return
      }

      // Para uso en el perfil
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECPERFIL) {
        // No hay evento aun en este caso
        return
      }

      // Para uso en el album que muestra la miniaturas
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECALBUMMINI) {
        // Si hay un doble click, se cambia el item a modo RECALBUMPREVIEw, afecta a todos los demas items de la lista
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.CAMBIAR_A_MODO_ALBUM_PREVIEW_ADMIN,
          informacion: this.configuracion.id
        }
        // Se cambia el item a modo RECALBUMPREVIEW y mostrar la descripcion
        this.configuracion.usoDelItem = UsoItemRectangular.RECALBUMPREVIEW
        this.configuracion.eventoEnItem(this.infoAccion)
        return
      }

      // Para uso en el album que muestra la preview
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECALBUMPREVIEW) {
        // No hay evento denifinido aun en este caso
        return
      }
    } catch(error) {
      console.log(error)
    }
  }
  
  // Se ejecuta cuando se produce un evento de click largo en el item
  eventoClickLargo() {
    try {
      // Si el item no tiene eventos
      if (!this.configuracion.activarLongPress) {
        return
      }

      // Para uso en el perfil
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECPERFIL) {
        // No hay evento aun en este caso
        return
      }

      // Para uso en el album que muestra la miniaturas
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECALBUMMINI) {
        // Borrar imagen en click largo
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.BORRAR_ITEM,
          informacion: {
            id: this.configuracion.id
          }
        }
        return
      }

      // Para uso en el album que muestra la preview
      if (this.configuracion.usoDelItem === UsoItemRectangular.RECALBUMPREVIEW) {
        // No hay evento denifinido aun en este caso
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Se ejecuta cuando se detecta el cambio de valor en el input tipo file del item
  cambioEnInputTipoFile(file:File) {
    try {
      if (file) {
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.SUBIR_ARCHIVO,
          informacion: {
            id: this.configuracion.id,
            archivo: file
          }
        }
        console.log(this.infoAccion)
        this.configuracion.eventoEnItem(this.infoAccion)
      }
    } catch (error) {
      console.log(error) 
    }
  }

  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const x = evt.srcElement.x
      const y = evt.srcElement.y
      if ((x === 0 ) && (y === 0)) {
        const width = evt.srcElement.width
        const height = evt.srcElement.height
        const portrait = height > width ? true : false
      }
      this.configuracion.mostrarLoader = false
    }
 }

}