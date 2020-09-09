import { TipoDialogo } from '../../diseno/enums/tipo-dialogo.enum';
import { DialogoServicie } from 'src/app/nucleo/servicios/diseno/dialogo.service';
import { DialogoCompartido } from '../../diseno/modelos/dialogo.interface';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

/*
@autor: Modifcado por el churon
@Fecha: 28 julio 2020
@Detalle: Componente generico de dialogos o modales.
@Implementacion: La implementacion es mediante la importacion del componente en el html

      <app-dialogo id="custom-modal-1" [data]="dataDialogo"></app-dialogo>

@Param id: Identificador del modal, para poder gestionarlo en un futuro
@Param data: DialogoCompartido, interfaz utilizada para asignar configuracion al dialogo
*/
@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {
  @ViewChild('descripcion', { static: false }) containerDescripcion: ElementRef
  @ViewChild('principal', { static: false }) containerPrincipal: ElementRef
  @ViewChild('fondo', { static: false }) fondo: ElementRef

  @Input() configuracion: DialogoCompartido
  
  public tipoDialogo = TipoDialogo

  constructor (
    private render: Renderer2,
  ) {
    
  }

  ngOnInit(): void {    
    // if (this.configuracion.completo) {
    //   this.element.addEventListener('click', el => {
    //     if (el.target.className === 'modal' || el.target.className === "modal fondoModal") {
    //       this.cerrar();
    //     }
    //   });
    // }
    // this.dialogoServicie.add(this);
  }

  ngAfterViewInit() {
    this.definirEstilo();
  }

  ngOnDestroy(): void {
    // this.dialogoServicie.remove(this.id);
    // this.element.remove();
  }

  eventoModal(target:any) {
    if (this.configuracion.completo) {
      target.classList.forEach((clase:any) => {
        if (clase === 'modal') {
          this.configuracion.mostrarDialogo = false
          return
        }
      })
    }
  }

  definirEstilo() {
    // this.cerrar(); //el modal inicia cerrado

    if (this.configuracion.completo) {
      this.render.addClass(this.fondo.nativeElement, "fondoModal");
    }
    switch (this.configuracion.tipo) {
      case TipoDialogo.CONFIRMACION:
        this.render.addClass(this.containerPrincipal.nativeElement, "dimensionesConfirmacion");
        this.render.addClass(this.containerDescripcion.nativeElement, "dimensionDescripcionConfirmacion");
        break;
      case TipoDialogo.MULTIPLE_ACCION:
        this.render.addClass(this.containerPrincipal.nativeElement, "dimensionesMultipleAccion");
        this.render.addClass(this.containerDescripcion.nativeElement, "dimensionDescripcionMultipleAccion");
        break;
      case TipoDialogo.MULTIPLE_ACCION_HORIZONTAL:
        this.render.addClass(this.containerPrincipal.nativeElement, "dimensionesMultipleAccionHorizontal");
        break;
    }
  }

  definirTamanoLetra(elemento: any, tamano: TamanoTextoDialogo) {
    this.render.addClass(elemento, tamano.toString());
  }

}

export enum TamanoTextoDialogo {
  PEQUENA = "letra-024",
  MEDIANA = "letra-029",
  GRANDE = "letra-349",
  EXTGRANDE = "letra-423"
}


