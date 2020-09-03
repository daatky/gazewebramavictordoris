import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { DialogoServicie } from 'src/app/nucleo/servicios/diseno/dialogo.service';

@Component({
  selector: 'app-modal-inferior',
  templateUrl: './modal-inferior.component.html',
  styleUrls: ['./modal-inferior.component.scss']
})
export class ModalInferiorComponent implements OnInit {
  @Input() data: ModalInferior

  constructor
    () {
  }

  ngOnInit(): void {

  }

  
  eventoModal(target: any) {
    target.classList.forEach((clase: any) => {
      if (clase === 'fondo-modal-inferior') {
        if (!this.data.bloqueado) {
          this.data.abierto = false;
        }
      }
    })
  }

}

export interface ModalInferior {
  id: string,
  bloqueado: boolean,
  abierto: boolean,
}
