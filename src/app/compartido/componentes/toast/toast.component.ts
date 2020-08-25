import { ConfiguracionToast } from './../../diseno/modelos/toast.interface';
import { Component, OnInit, Input } from '@angular/core';
import { EstiloDelTextoServicio } from 'src/app/nucleo/servicios/diseno/estilo-del-texto.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() configuracion: ConfiguracionToast

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio
  ) { }

  ngOnInit(): void {
  }

  cambiarStatusToast(texto: string, mostrarLoader: boolean, mostrarToast: boolean, cerrarClickOutside: boolean) {
    this.configuracion.texto = texto
    this.configuracion.mostrarLoader = mostrarLoader
    this.configuracion.mostrarToast = mostrarToast
    this.configuracion.cerrarClickOutside = cerrarClickOutside
  }

  cerrarToast() {
    if (this.configuracion.cerrarClickOutside) {
      this.configuracion.mostrarLoader = false
      this.configuracion.texto = ''
      this.configuracion.mostrarToast = false
    }
  }

}
