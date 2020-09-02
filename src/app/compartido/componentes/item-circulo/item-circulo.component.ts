import { EstiloDelTextoServicio } from './../../../nucleo/servicios/diseno/estilo-del-texto.service';
import { ModalOrigenFoto } from './../../diseno/modelos/modal-opciones-foto.interface';
import { OrigenFoto } from '../../diseno/enums/origen-foto.enum';
import { UsoItemCircular } from './../../diseno/enums/uso-item-cir-rec.enum';
import { ItemCircularCompartido } from './../../diseno/modelos/item-cir-rec.interface';
import { Component, OnInit, Renderer2, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core'
import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service'
import { ItemCircularRectangularMetodosCompartidos } from 'src/app/nucleo/servicios/diseno/item-cir-rec.service'
import { InfoAccionCirRec } from '../../diseno/modelos/info-accion-cir-rec.interface'
import { AccionesItemCircularRectangular } from '../../diseno/enums/acciones-item-cir-rec.enum'
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-item-circulo',
  templateUrl: './item-circulo.component.html',
  styleUrls: ['./item-circulo.component.scss']
})
export class ItemCirculoComponent implements OnInit, AfterViewInit {

  /* 
    Especificaciones generales,

    - Antes de diubjar el item, se debe configurar segun el uso que se le vaya a dar: enum UsoItemCircular
    - La configuracion debe ser almacenada en una variable de tipo modelo ItemCircularCompartido y asignada al paremetro @Input() configuracion
    - Las acciones que se disparan en el item segun el tipo de evento, estan catalogadas por el enum AccionesItemCirRec
    - Cuando una imagen es anadida al item, se debe ocultar el boton para que el loader se muestre hasta que la foto este cargada
  */

  @ViewChild('inputFile', { static: false }) inputFile: ElementRef
  @Input() configuracion: ItemCircularCompartido // Configuracion del item, para dibujar el item los valores de configuracion.eventoEnItemtido deben ser establecidos
  
  public infoAccion:InfoAccionCirRec // Informacion de que accion se va a ejecutar en el padre cuando se dispare un evento
  public itemMetodos:ItemCircularRectangularMetodosCompartidos // Contiene metodos generales para el item
  public confModalOrigenFoto: ModalOrigenFoto // Modal origen foto

  constructor(
    private generadorId:GeneradorId,
    public estiloDelTextoServicio: EstiloDelTextoServicio
  ) {
    this.itemMetodos = new ItemCircularRectangularMetodosCompartidos()
  }

  ngOnInit(): void {
      this.configuracion.idInterno = this.generadorId.generarIdConSemilla() // Generar id interno
      this.configurarOrigenFoto()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Inicializar Eventos Tap y Doble Tap
      const canvas = document.getElementById("itemCirculoCanvas" + this.configuracion.idInterno) as HTMLElement
      const gestor = this.itemMetodos.inicializarEventosDeTapPersonalizados(canvas)
      gestor.on('tap', () => {
        this.eventoClick()
      })
      gestor.on('dobletap', () => {
        this.eventoDobleClick()
      })
    })
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

  configurarOrigenFoto() {
    this.confModalOrigenFoto = {
      mostrar: false,
      origenFoto: OrigenFoto.SIN_DEFINIR
    }
  }

  eventoEnModalOrigenFoto(evento: number) {
    this.confModalOrigenFoto.mostrar = false
    if (evento === 0) {
      // Tomar Foto
      this.infoAccion = {
        accion: AccionesItemCircularRectangular.TOMAR_FOTO
      }
      this.configuracion.eventoEnItem(this.infoAccion)
      return
    }

    if (evento === 1) {
      // Subir foto
      const selector = document.getElementById("itemCirculoInputFile" + this.configuracion.idInterno)
      selector.click()
      return
    }
  }
  

  // Se ejecuta cuando se produce un click en el item
  eventoClick() {
    try {
      // Si el item no tiene eventos de click
      if (!this.configuracion.activarClick || this.configuracion.mostrarLoader) {
        return
      }

      // Cuando el item es usado en el perfil
      if (this.configuracion.usoDelItem === UsoItemCircular.CIRPERFIL) {
        // Si esta en modo visita, se expande la foto del item
        if (this.configuracion.esVisitante) {
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

        // Accion por defecto, ABRIR EL ALBUM DE TIPO PERFIL EN MODO ADMIN
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.ABRIR_ADMIN_ALBUM_PERFIL
        }
        this.configuracion.eventoEnItem(this.infoAccion)
        return
      }

      // Cuando el item es usado en el album
      if (this.configuracion.usoDelItem === UsoItemCircular.CIRALBUM) {
        // Accion por defecto
        // Mostrar modal definir opcion origen foto
        this.confModalOrigenFoto.mostrar = true
        return
      }

      // Cuando el item es usado en el contacto
      if (this.configuracion.usoDelItem === UsoItemCircular.CIRCONTACTO) {
        // No se implementa aun la parte de contactos
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Se ejecuta cuando se produce un doble click en el item
  eventoDobleClick() {
    try {
      // Si el item no tiene eventos
      if (!this.configuracion.activarDobleClick || this.configuracion.mostrarLoader) {
        return
      }

      // Cuando es usado en el perfil
      if (this.configuracion.usoDelItem === UsoItemCircular.CIRPERFIL) {
        // Accion por defecto
        // Indica que se debe llevar a actualizar el perfil (En caso de ser mi perfil, eso se valida en el padre)
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.ACTUALIZAR_PERFIL
        }
        this.configuracion.eventoEnItem(this.infoAccion)
        return
      }

      // Cuando es usado en el album
      if (this.configuracion.usoDelItem === UsoItemCircular.CIRALBUM) {
        if (this.configuracion.fotoPredeterminadaRamdon) {
          // El item predeterminado se obtiene de forma aleatoria
          return
        }

        // Accion por defecto
        // Cuando el item predeterminado se obtiene con doble click
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.ESTABLECER_ITEM_PREDETERMINADO,
          informacion: {
            id: this.configuracion.id,
            urlMedia: this.configuracion.urlMedia
          }
        }
        this.configuracion.eventoEnItem(this.infoAccion)
        return
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Se ejecuta cuando se produce un long click en el item
  eventoClickLargo() {
    try {
      // Si el item no tiene eventos
      if (!this.configuracion.activarLongPress || this.configuracion.mostrarLoader) {
        return
      }

      // Cuando es usado en el perfil
      if (this.configuracion.usoDelItem === UsoItemCircular.CIRPERFIL) {
        // No hay evento definido aun
        return
      }

      // Cuando es usado en el album
      if (this.configuracion.usoDelItem === UsoItemCircular.CIRALBUM) {
        // Borrar imagen en click largo
        this.infoAccion = {
          accion: AccionesItemCircularRectangular.BORRAR_ITEM,
          informacion: {
            id: this.configuracion.id
          }
        }
        // Accion por defecto
        this.configuracion.eventoEnItem(this.infoAccion)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Se ejecuta cuando cambia el valor del input tipo file del item
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
        this.configuracion.eventoEnItem(this.infoAccion)
        this.inputFile.nativeElement.value = ""
      }
    } catch (error) {
      console.log(error)
    }
  }

  cerrarModalOrigenFoto(event: any) {
    if (event.target.className.indexOf('modalOrigenFoto') >= 0) {
      this.confModalOrigenFoto.mostrar = false
      this.confModalOrigenFoto.origenFoto = OrigenFoto.SIN_DEFINIR
    }
  }

}
