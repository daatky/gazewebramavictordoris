import { TipoDialogo } from '../../diseno/enums/tipo-dialogo.enum';
import { DialogoServicie } from 'src/app/nucleo/servicios/diseno/dialogo.service';
import { DialogoCompartido } from '../../diseno/modelos/dialogo.interface';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

/*
@autor: Victor Jumbo
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
  @ViewChild('descripcion', { static: false })
  private containerDescripcion: ElementRef

  @ViewChild('principal', { static: false })
  private containerPrincipal: ElementRef

  @ViewChild('fondo', { static: false })
  private fondo: ElementRef


  dialogo = TipoDialogo;
  @Input() data: DialogoCompartido

  @Input() id: string;
  private element: any;


  constructor
  (
    private render: Renderer2,
    private dialogoServicie: DialogoServicie,
    private el: ElementRef    
    ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    if (this.data.completo) {
      // close modal on background click      
      this.element.addEventListener('click', el => {
        if (el.target.className === 'modal' || el.target.className === "modal fondoModal") {
          this.cerrar();
        }
      });
    }
    this.dialogoServicie.add(this);
  }

  ngAfterViewInit() {
    this.definirEstilo();
  }

  ngOnDestroy(): void {
    this.dialogoServicie.remove(this.id);
    this.element.remove();
  }

  definirEstilo() {
    this.cerrar(); //el modal inicia cerrado

    if (this.data.completo) {
      this.render.addClass(this.fondo.nativeElement, "fondoModal");
    }
    switch (this.data.tipo) {
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

  definirTamanoLetra(elemento, tamano: TamanoTextoDialogo) {
    this.render.addClass(elemento, tamano.toString());
  }


  // open modal
  abrir(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modalAbierto');
  }

  // close modal
  cerrar(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modalAbierto');
  }
}

export enum TamanoTextoDialogo {
  PEQUENA = "letra-024",
  MEDIANA = "letra-029",
  GRANDE = "letra-349",
  EXTGRANDE = "letra-423"
}


