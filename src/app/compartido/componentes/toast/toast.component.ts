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
  intervaloTimer;

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio
  ) { }

  ngOnInit(): void {
    // this.visibleHasta()
  }

  cambiarStatusToast(texto: string, mostrarLoader: boolean, mostrarToast: boolean, cerrarClickOutside: boolean) {
    this.configuracion.texto = texto
    this.configuracion.mostrarLoader = mostrarLoader
    this.configuracion.mostrarToast = mostrarToast
    this.configuracion.cerrarClickOutside = cerrarClickOutside
  }

  abrirToast(mensaje: string, progress: boolean = false) {
    this.configuracion.mostrarLoader = progress;
    this.configuracion.bloquearPantalla = progress
    if (progress) {
      this.configuracion.cerrarClickOutside = false;
    } else {
    }
    this.configuracion.mostrarToast = true;
    this.configuracion.texto = mensaje;
    this.visibleHasta()
  }

  cerrarToast() {
    /*
    if (this.configuracion.cerrarClickOutside && !this.configuracion.bloquearPantalla) {
      this.configuracion.mostrarLoader = false
      this.configuracion.texto = ''
      this.configuracion.mostrarToast = false
    }
    */
    this.configuracion.mostrarToast = false
    this.configuracion.texto = ''
    this.configuracion.mostrarLoader = false
  }

  visibleHasta() {
    if (!this.configuracion.mostrarLoader) {
      if (!this.configuracion.intervalo) {
        this.configuracion.intervalo = 5;
      }
      this.intervaloTimer = setInterval(() => {
        if (this.configuracion.intervalo > 0) {
          this.configuracion.intervalo--;
          console.log(this.configuracion.intervalo);
        } else {
          console.log("cerrar toast");
          clearInterval(this.intervaloTimer)
          this.cerrarToast();
        }
      }, 1000)
    }

  }




}
