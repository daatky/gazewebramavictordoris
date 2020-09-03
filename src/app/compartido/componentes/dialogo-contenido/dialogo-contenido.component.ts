import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dialogo-contenido',
  templateUrl: './dialogo-contenido.component.html',
  styleUrls: ['./dialogo-contenido.component.scss']
})
export class DialogoContenidoComponent implements OnInit {
  @Input() data: ModalContenido;


  constructor() {

  }

  ngOnInit(): void {

  }

  eventoModal(target: any) {
    target.classList.forEach((clase: any) => {
      if (clase === 'fondo-modal') {
        if (!this.data.bloqueado) {
          this.data.abierto = false;
        }
      }
    })
  }
}

export interface ModalContenido {
  titulo: string
  id: string,
  bloqueado: boolean,
  abierto: boolean,
}
