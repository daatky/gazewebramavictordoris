import { map, debounceTime } from 'rxjs/operators';
import { GeneradorId } from './../../../nucleo/servicios/generales/generador-id.service';
import { Observable, fromEvent } from 'rxjs';
import { EstiloDelTextoServicio } from '../../../nucleo/servicios/diseno/estilo-del-texto.service';
import { ItemSelector } from '../../diseno/modelos/elegible.interface';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { ConfiguracionBuscadorModal } from '../../diseno/modelos/buscador-modal.interface'
import { InfoAccionBuscadorLocalidades } from '../../diseno/modelos/info-acciones-buscador-localidades.interface'
import { AccionesBuscadorModal } from '../../diseno/enums/acciones-buscador-localidades.enum'

@Component({
  selector: 'app-buscador-modal',
  templateUrl: './buscador-modal.component.html',
  styleUrls: ['./buscador-modal.component.scss']
})
export class BuscadorModalComponent implements OnInit, AfterViewInit {
  @ViewChild('inputBuscador', { static: false }) inputBuscador: ElementRef

  @Input() pais:ItemSelector // Pais seleccionado
  @Input() configuracion: ConfiguracionBuscadorModal
  @Output() evento: EventEmitter<InfoAccionBuscadorLocalidades>

  public barraBusqueda$: Observable<string>
  public stringBasico: string
  public idInterno: string

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio,
    public generadorId: GeneradorId,
  ) {
    this.stringBasico = 'inputBuscador_'
    this.evento = new EventEmitter<InfoAccionBuscadorLocalidades>()
  }

  ngOnInit() {
    this.idInterno = this.generadorId.generarIdConSemilla()
  }

  ngAfterViewInit(): void {
    this.configurarObservable()
  }

  // Inicializar observable
  configurarObservable() {
    this.barraBusqueda$ = fromEvent<any>(this.inputBuscador.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(500),
      )
    
    this.barraBusqueda$.subscribe(query => {
      this.configuracion.inputBuscador.valor = query
      this.buscar()
    })
  }

  // Abrir selector
  clickInputPreview() {
    this.evento.emit({
      accion: AccionesBuscadorModal.ABRIR_BUSCADOR
    })
  }

  // Buscar
  buscar() {
    if (this.configuracion.inputBuscador.valor.length > 0) {
      const data = {
        accion: AccionesBuscadorModal.REALIZAR_BUSQUEDA,
        informacion: {
          pais: this.pais.codigo,
          query: this.configuracion.inputBuscador.valor
        }
      }
      this.evento.emit(data)
    }
  }

  // Reiniciar selector
  reiniciarBuscador() {
    // Mostrar modal
    this.configuracion.mostrarModal = false
    // Input buscador
    this.configuracion.inputBuscador.valor = ''
    // Elegibles
    this.configuracion.resultado.items = []
    this.configuracion.resultado.mostrarElegibles = false
    // Cargando
    this.configuracion.resultado.mostrarCargando = false
    // Error
    this.configuracion.resultado.error.contenido = ''
    this.configuracion.resultado.error.tamanoCompleto = false
    this.configuracion.resultado.error.mostrarError = false
  }

  // Setear error
  mostrarError( contenido: string, mostrar: boolean, tamanoCompleto: boolean = false ) {
    this.configuracion.resultado.error.contenido = contenido
    this.configuracion.resultado.error.tamanoCompleto = tamanoCompleto
    this.configuracion.resultado.error.mostrarError = mostrar
    this.configuracion.resultado.mostrarCargando = false
  }

  // Mostrar Elegibles
  mostrarElegibles(lista:ItemSelector[]) {
    if (lista.length > 0) {
      this.configuracion.resultado.items = lista
      this.configuracion.resultado.mostrarElegibles = true
    } else {
      this.mostrarError('No existen coincidencias', true)
    }
  }

  // Mostrar Cargando
  mostrarCargando(mostrar:boolean) {
    this.configuracion.resultado.mostrarCargando = mostrar
  }

  // Validar si el elegible esta activo
  validarElegibleActivo(codigo:string) {
    if (this.configuracion.seleccionado) {
      return this.configuracion.seleccionado.codigo === codigo
    } else {
      return false
    }
  }

  // Seleccionar item
  seleccionarItem(item: ItemSelector) {
    this.configuracion.seleccionado = item
    this.configuracion.inputPreview.input.valor = this.configuracion.seleccionado.nombre + ' (CP: ' + this.configuracion.seleccionado?.auxiliar + ')'
    this.configuracion.inputPreview.input.auxiliar = this.configuracion.seleccionado?.auxiliar
    this.reiniciarBuscador()
  }

  // Evento en modal (Borde negro)
  eventoModal(target:any) {
    target.classList.forEach((clase:any) => {
      if (clase === 'modal') {
        this.reiniciarBuscador()
        return
      }
    })
  }
}
