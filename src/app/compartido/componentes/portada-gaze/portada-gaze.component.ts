import { Component, OnInit, Input } from '@angular/core'
import { PortadaGazeCompartido } from '../../diseno/modelos/portada-gaze.interface'
import { TamanoPortadaGaze } from '../../diseno/enums/tamano-portada-gaze.enum'

@Component({
  selector: 'app-portada-gaze',
  templateUrl: './portada-gaze.component.html',
  styleUrls: ['./portada-gaze.component.scss']
})
export class PortadaGazeComponent implements OnInit {

  @Input() configuracionPortada: PortadaGazeCompartido

  constructor() { }

  ngOnInit(): void {
    if (!this.configuracionPortada) {
      this.configuracionPortada = {
        tamano: TamanoPortadaGaze.PORTADACOMPLETA
      }
    }

  }

  obtenerClasesPortada() {
    const clases = {}
    clases[this.configuracionPortada.tamano.toString()] = true
    if (this.configuracionPortada.espacioDerecha) {
      clases['espacio-derecha'] = this.configuracionPortada.espacioDerecha
    }
    return clases
  }

  reDibujar(a: PortadaGazeCompartido) {
    this.configuracionPortada = a
  }

}
