import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { DialogoServicie } from 'src/app/nucleo/servicios/diseno/dialogo.service';

@Component({
  selector: 'app-dialogo-contenido',
  templateUrl: './dialogo-contenido.component.html',
  styleUrls: ['./dialogo-contenido.component.scss']
})
export class DialogoContenidoComponent implements OnInit {
  @Input() data: DialogoContenido;
  @Input() id: string;
  private element: any;
  @ViewChild('principal', { static: false })
  private containerPrincipal: ElementRef

  @ViewChild('fondo', { static: false })
  private fondo: ElementRef

  constructor(
    private modalService: DialogoServicie,
    private el: ElementRef,
    private render: Renderer2) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.modalService.add(this);

    this.element.addEventListener('click', el => {
      if (el.target.className === "modal fondoModal") {
        this.cerrar();
      }
    });
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.data.id);
    this.element.remove();
  }

  ngAfterViewInit() {
    this.cerrar();
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

export interface DialogoContenido {
  id: string,
  titulo: string
}
